import * as path from 'path';
import {
  aws_iam as iam,
  aws_imagebuilder as imagebuilder,
  aws_lambda as lambda,
  aws_sns as sns,
  aws_sns_subscriptions as subscriptions,
  RemovalPolicy,
} from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import { Key } from 'aws-cdk-lib/aws-kms';
import { SnsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';
import { IStringParameter, StringParameter } from 'aws-cdk-lib/aws-ssm';
import { Construct } from 'constructs';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as yaml from 'js-yaml';

export interface VolumeProps {
  /**
     * Name of the volume
     */
  readonly deviceName: string;
  /**
     * EBS Block Store Parameters
     */
  readonly ebs: imagebuilder.CfnImageRecipe.EbsInstanceBlockDeviceSpecificationProperty;
}

/**
 * Build commands for the component
 */
export interface IActionCommands {
  commands: string[];
}

export interface IStepCommands {
  name: string;
  action: 'ExecuteBash' | 'ExecutePowerShell' | 'UpdateOS';
  inputs?: IActionCommands;
}

/**
 * Phases for the component
 */
export interface IPhases {
  name: 'build' | 'validate' | 'test';
  steps: IStepCommands[];
}

export interface IInputParameter {
  type: string;
  default: string;
  description: string;
}

export interface IParameters {
  [key: string]: IInputParameter;
}

/**
 * Component data
 */
export interface IComponentDocument {
  name: string;
  description: string;
  schemaVersion: string;
  phases: IPhases[];
}

/**
 * Component props
 */
export interface IComponentProps {
  name: string;
  description: string;
  schemaVersion: string;
  parameters?: IParameters;
  platform?: 'Linux' | 'Windows';
  componentDocument: IComponentDocument;
}

export interface ImagePipelineProps {
  /**
     * Vpc to use for the Image Builder Pipeline
     */
  readonly vpc: Vpc;
  /**
     * List of component props
     */
  readonly components: IComponentProps[];
  /**
     * Name of the instance profile that will be associated with the Instance Configuration.
     */
  readonly profileName?: string;
  /**
     * Additional policies to add to the instance profile associated with the Instance Configurations
     */
  readonly additionalPolicies?: iam.ManagedPolicy[];
  /**
     * Name of the Infrastructure Configuration for Image Builder
     */
  readonly infraConfigName?: string;
  /**
     * Name of the Image Recipe
     */
  readonly imageRecipeName?: string;
  /**
     * UserData script that will override default one (if specified)
     *
     * @default - none
     */
  readonly userDataScript?: string;
  /**
     * Image recipe version (Default: 0.0.1)
     */
  readonly imageRecipeVersion?: string;
  /**
     * Name of the Image Pipeline
     */
  readonly pipelineName?: string;
  /**
     * The source (parent) image that the image recipe uses as its base environment. The value can be the parent image ARN or an Image Builder AMI ID
     */
  readonly parentImage: string;
  /**
     * KMS Key used to encrypt the SNS topic. Enter an existing KMS Key in your target account/region.
     */
  readonly kmsKey?: Key;
  /**
     * List of instance types used in the Instance Configuration (Default: [ 't3.medium', 'm5.large', 'm5.xlarge' ])
     */
  readonly instanceTypes?: string[];
  /**
     * Platform type Linux or Windows (Default: Linux)
     */
  readonly platform?: 'Linux' | 'Windows';
  /**
     * Email used to receive Image Builder Pipeline Notifications via SNS
     */
  readonly email?: string;
  /**
     * List of security group IDs for the Infrastructure Configuration
     */
  readonly securityGroupIds?: string[];
  /**
     * Subnet ID for the Infrastructure Configuration
     */
  readonly ebsVolumeConfigurations?: VolumeProps[];
  /**
     * Set to true if you want to enable continuous vulnerability scans through AWS Inpector
     */
  readonly enableVulnScans?: boolean;
  /**
     * Store vulnerability scans through AWS Inspector in ECR using this repo name (if option is enabled)
     */
  readonly vulnScansRepoName?: string;
  /**
     * Store vulnerability scans through AWS Inspector in ECR using these image tags (if option is enabled)
     */
  readonly vulnScansRepoTags?: string[];
  /**
     * Set to true if you want to copy this AMI to other accounts using a Distribution Configuration
     */
  readonly enableCrossAccountDistribution?: boolean;
  /**
     * List of accounts to copy this AMI to, if the option to do so is enabled
     */
  readonly distributionAccountIDs?: string[];
  /**
     * List of regions to copy this AMI to, if the option to do so is enabled
     */
  readonly distributionRegions?: string[];
  /**
     * Parameter Store path to store latest AMI ID under
     */
  readonly amiIdSsmParameterName?: string;
  /**
     * Account ID for Parameter Store path above
     */
  readonly amiIdSsmAccountId?: string;
  /**
     * Region for Parameter Store path above
     */
  readonly amiIdSsmRegion?: string;
}

export class ImagePipeline extends Construct {
  imageRecipeComponents: imagebuilder.CfnImageRecipe.ComponentConfigurationProperty[];

  constructor(scope: Construct, id: string, props: ImagePipelineProps) {
    super(scope, id);
    let infrastructureConfig: imagebuilder.CfnInfrastructureConfiguration;
    let imageRecipe: imagebuilder.CfnImageRecipe;
    this.imageRecipeComponents = [];

    // Construct code below
    const topic = new sns.Topic(this, 'ImageBuilderTopic', {
      displayName: 'Image Builder Notify',
      masterKey: props.kmsKey,
    });

    if (props.email != null) {
      topic.addSubscription(new subscriptions.EmailSubscription(props.email));
    }

    const role = new iam.Role(this, 'Role', {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
      description: 'IAM role used as part of an Image Builder pipeline',
    });

    role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('EC2InstanceProfileForImageBuilder'));
    role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('EC2InstanceProfileForImageBuilderECRContainerBuilds'));
    role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore'));
    if (typeof props.additionalPolicies !== 'undefined' && props.additionalPolicies.length >= 1) {
      for (const policy of props.additionalPolicies) {
        role.addManagedPolicy(policy);
      }
    }


    const instanceProfileName = props.profileName ?? `${this.node.id}-InstanceProfile`;
    const infraConfigName = props.infraConfigName ?? `${this.node.id}-InfrastructureConfiguration`;
    const imageRecipeName = props.imageRecipeName ?? `${this.node.id}-ImageRecipe`;
    const pipelineName = props.pipelineName ?? `${this.node.id}-ImagePipeline`;
    const kmsKey = props.kmsKey ?? new Key(this, 'KmsKey', {
      description: 'KMS Key used to encrypt the SNS topic',
      enableKeyRotation: true,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const profile = new iam.CfnInstanceProfile(this, 'InstanceProfile', {
      roles: [role.roleName],
      instanceProfileName: instanceProfileName,
    });


    const securityGroup = new ec2.SecurityGroup(this, 'SecurityGroup', {
      vpc: props.vpc,
      allowAllOutbound: true,
      securityGroupName: 'ImageBuilderSecurityGroup',
    });

    infrastructureConfig = new imagebuilder.CfnInfrastructureConfiguration(this, 'InfrastructureConfiguration', {
      instanceProfileName: instanceProfileName,
      name: infraConfigName,
      description: 'Example Infrastructure Configuration for Image Builder',
      instanceTypes: props.instanceTypes ?? ['t3.medium', 'm5.large', 'm5.xlarge'],
      snsTopicArn: topic.topicArn,
      securityGroupIds: props.securityGroupIds ? props.securityGroupIds : [securityGroup.securityGroupId],
      subnetId: props.vpc.publicSubnets[0].subnetId,
    });

    infrastructureConfig.addDependency(profile);

    /**
         * Image recipe configuration
         */
    let imageRecipeProps: imagebuilder.CfnImageRecipeProps;
    imageRecipeProps = {
      components: [],
      name: imageRecipeName,
      parentImage: props.parentImage,
      version: props.imageRecipeVersion ?? '0.0.1',
    };
    if (props.userDataScript) {
      imageRecipeProps = {
        ...imageRecipeProps,
        additionalInstanceConfiguration: {
          userDataOverride: props.userDataScript,
        },
      };
    }
    if (props.ebsVolumeConfigurations) {
      imageRecipeProps = {
        ...imageRecipeProps,
        blockDeviceMappings: props.ebsVolumeConfigurations,
      };
    }
    imageRecipe = new imagebuilder.CfnImageRecipe(this, 'ImageRecipe', imageRecipeProps);


    props.components.forEach((component: IComponentProps) => {
      const data = yaml.dump(component.componentDocument);
      let newComponent = new imagebuilder.CfnComponent(this, component.name, {
        name: component.name,
        description: component.description,
        platform: component.platform ?? 'Linux',
        version: component.schemaVersion,
        data: data,
      });

      // add the component to the Image Recipe
      this.imageRecipeComponents.push({ componentArn: newComponent.attrArn });
      imageRecipe.components = this.imageRecipeComponents;
    });

    let imagePipelineProps: imagebuilder.CfnImagePipelineProps;
    imagePipelineProps = {
      infrastructureConfigurationArn: infrastructureConfig.attrArn,
      name: pipelineName,
      description: 'Image pipeline',
      imageRecipeArn: imageRecipe.attrArn,
    };
    if (props.enableVulnScans) {
      imagePipelineProps = {
        ...imagePipelineProps,
        imageScanningConfiguration: {
          imageScanningEnabled: props.enableVulnScans,
          ecrConfiguration: {
            repositoryName: props.vulnScansRepoName,
            containerTags: props.vulnScansRepoTags,
          },
        },
      };
    }
    if (props.enableCrossAccountDistribution) {
      const distributionsList: imagebuilder.CfnDistributionConfiguration.DistributionProperty[] = [];
      props.distributionRegions?.forEach(distributionRegion => {
        const distributionConfig: any = {
          region: distributionRegion,
          amiDistributionConfiguration: {
            //Capital case here because it's an object of type any, but capital case is what is expected in CloudFormation
            //https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-imagebuilder-distributionconfiguration-amidistributionconfiguration.html
            Name: `${props.imageRecipeName}-${distributionRegion}-{{imagebuilder:buildDate}}`,
            Description: `copy AMI ${props.imageRecipeName} to ${distributionRegion}`,
            TargetAccountIds: props.distributionAccountIDs,
            LaunchPermissionConfiguration: {
              UserIds: props.distributionAccountIDs,
            },
            KmsKeyId: kmsKey, //use default AWS-managed key if one isn't given
          },
        };
        distributionsList.push(distributionConfig);
      });
      const amiDistributionConfiguration = new imagebuilder.CfnDistributionConfiguration(this, 'amiDistributionConfiguration', {
        name: `${props.imageRecipeName}-distribution-config`,
        description: `Cross account distribution settings for ${props.imageRecipeName}`,
        distributions: distributionsList,
      });
      imagePipelineProps = {
        ...imagePipelineProps,
        distributionConfigurationArn: amiDistributionConfiguration.attrArn,
      };
    }

    /**
         * Create Lambda to add latest built image's ID to Parameter Store
         * (only if a Parameter Store path is provided)
         */
    if (props.amiIdSsmParameterName) {
      const amiSsmUpdateLambdaPolicy = new iam.PolicyDocument({
        statements: [
          new iam.PolicyStatement({
            resources: [`arn:aws:ssm:${props.amiIdSsmRegion}:${props.amiIdSsmAccountId}:parameter/${props.amiIdSsmParameterName}`],
            actions: [
              'ssm:PutParameter',
              'ssm:GetParameterHistory',
              'ssm:GetParameter',
              'ssm:GetParameters',
              'ssm:AddTagsToResource',
            ],
          }),
        ],
      });

      let amiIdSsm: IStringParameter;
      if (!props.amiIdSsmParameterName) {
        amiIdSsm = new StringParameter(this, 'AmiIdSsm', {
          parameterName: `${this.node.id}-AmiId`,
          stringValue: props.parentImage,
        });
      } else {
        amiIdSsm = StringParameter.fromStringParameterAttributes(this, 'ExistingAmiIdSsm', {
          parameterName: props.amiIdSsmParameterName,
        });
      }

      const amiSsmUpdateLambdaRole = new iam.Role(this, `${props.imageRecipeName}UpdateLambdaRole`, {
        assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
        managedPolicies: [
          iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
        ],
        inlinePolicies: {
          AmiSsmUpdateLambdaPolicy: amiSsmUpdateLambdaPolicy,
        },
      });
      const amiSsmUpdateLambda = new lambda.Function(this, `${props.imageRecipeName}UpdateLambda`, {
        runtime: lambda.Runtime.PYTHON_3_10,
        code: lambda.Code.fromAsset(path.join(__dirname, '../Resources/Lambdas/ImageBuilderUpdateLambda/Handler')),
        handler: 'image-builder-lambda-update-ssm.lambda_handler',
        role: amiSsmUpdateLambdaRole,
        environment: {
          SSM_PATH: amiIdSsm.parameterName,
        },
        memorySize: 256,
      });
      amiSsmUpdateLambda.addEventSource(new SnsEventSource(topic, {}));
    }
    new imagebuilder.CfnImagePipeline(this, 'ImagePipeline', imagePipelineProps);
  }
}
