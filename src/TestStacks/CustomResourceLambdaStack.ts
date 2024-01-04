import { CfnOutput, CustomResource, Duration, Stack, StackProps } from 'aws-cdk-lib';
import { IpAddresses, SubnetType, Vpc } from 'aws-cdk-lib/aws-ec2';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';
import * as stepfunctions from 'aws-cdk-lib/aws-stepfunctions';
import * as tasks from 'aws-cdk-lib/aws-stepfunctions-tasks';
import { Provider } from 'aws-cdk-lib/custom-resources';
import * as floyd from 'cdk-iam-floyd';
import { Construct } from 'constructs';
import { TestCustomResourceFunction } from '../Lambdas/TestCustomResource/TestCustomResource-function';
import { TestCustomResourceLambdaEnvironment } from '../Lambdas/TestCustomResource/TestCustomResource.lambda';

if (stepfunctions || tasks || lambda || floyd) {
}


export interface CustomResourceLambdaStackProps extends StackProps {
  vpcCidr: string;
}

export class CustomResourceLambdaStack extends Stack {
  constructor(
    scope: Construct,
    id: string,
    props: CustomResourceLambdaStackProps,
  ) {
    super(scope, id, props);
    const vpc = new Vpc(this, 'Vpc', {
      ipAddresses: IpAddresses.cidr(props.vpcCidr as string),
      maxAzs: 2,
      subnetConfiguration: [
        {
          name: 'Public',
          subnetType: SubnetType.PUBLIC,
          cidrMask: 24,
        },
        {
          name: 'Private',
          subnetType: SubnetType.PRIVATE_WITH_EGRESS,
          cidrMask: 24,
        },
      ],
      natGateways: 1,
    });

    const customResourceLambdaEnvironment: TestCustomResourceLambdaEnvironment = {
      STEP_FUNCTION_ARN: 'arn:aws:states:us-east-2:265654035060:stateMachine:MyStateMachine-oiye9p0di',
      IMAGE_PIPELINE_ARN: 'arn:aws:imagebuilder:us-east-2:265654035060:image-pipeline/testingimagepipelinestepfunction',
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      CUSTOM_RESOURCE_VERSION: '0.0.0',
    };
    const customResourceLambda = new TestCustomResourceFunction(this, 'CustomResourceLambdaFunction',
      {
        description: 'CustomResourceLambdaFunctions',
        memorySize: 128,
        timeout: Duration.minutes(12),
        vpc: vpc,
        vpcSubnets: {
          subnetType: SubnetType.PRIVATE_WITH_EGRESS,
        },
        environment: customResourceLambdaEnvironment,
        initialPolicy: [
          new floyd.States().allow().toStartExecution().onAllResources(),
          new floyd.Imagebuilder().allow().toListImagePipelines().onAllResources(),
          new floyd.Imagebuilder().allow().toStartImagePipelineExecution().onAllResources(),
        ],
      });


    if (customResourceLambda) {
    }

    const provider = new Provider(this, 'CustomResourceProvider', {
      onEventHandler: customResourceLambda,
    });


    new CustomResource(this, 'CustomResourceResult', {
      serviceToken: provider.serviceToken,
    });

    const amiId = StringParameter.fromStringParameterAttributes(this, 'AmiId', {
      parameterName: '/CustomResourceLambdaStack/AmiId',
    });

    new CfnOutput(this, 'CustomResourceAmiIDOutput', {
      value: amiId.stringValue,
    });

    new CfnOutput(this, 'CustomResourceLambdaStackOutput', {
      value: customResourceLambda.functionName,
    });

    new CfnOutput(this, 'VpcId', {
      value: vpc.vpcId,
    });
  }

  /// return an AMI ID that can be used to launch an instance of this image
}
