import { CfnOutput, Duration, Stack, StackProps } from 'aws-cdk-lib';
import { AmazonLinuxEdition, AmazonLinuxGeneration, AmazonLinuxImage, IpAddresses, SubnetType, Vpc } from 'aws-cdk-lib/aws-ec2';
import { StateMachine } from 'aws-cdk-lib/aws-stepfunctions';
import { Construct } from 'constructs';
import { StartImagePipelineFunction } from '../lib/Resources/Lambdas/StartImagePipeline/StartImagePipeline-function';
import { ImagePipeline } from '../src';
import { STATE_MACHINE_ARN_ENV } from '../src/Resources/Lambdas/StartImagePipeline/StartImagePipeline.lambda';

export interface StateMachineLambdaStackProps extends StackProps {
  vpcCidr: string;
}

export class StateMachineLambdaStack extends Stack {

  constructor(
    scope: Construct,
    id: string,
    props: StateMachineLambdaStackProps,
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
    const image = new AmazonLinuxImage({
      generation: AmazonLinuxGeneration.AMAZON_LINUX_2,
      edition: AmazonLinuxEdition.STANDARD,
    });
    const imagePipeline = new ImagePipeline(this, 'ImagePipeline', {
      parentImage: image.getImage(this).imageId,
      vpc: vpc,
      imageRecipeVersion: process.env.versionNumber,
      components: [
        {
          name: 'TestComponent',
          description: 'Test Component',
          schemaVersion: '1.0.0',
          platform: 'Linux',
          componentDocument: {
            name: 'TestComponent',
            description: 'Test Component',
            schemaVersion: '1.0',
            phases: [{
              name: 'build',
              steps: [
                {
                  name: 'hello',
                  action: 'ExecuteBash',
                  inputs: {
                    commands: [
                      'echo "Hello World"',
                    ],
                  },
                },
              ],
            }],
          },
        },
      ],
    });

    const imagePipelineStateMachine = new StateMachine(this, 'ImagePipelineStateMachine', {
      // state machine definition...
    });

    const startPipelineFunction = new StartImagePipelineFunction(this, 'StartImagePipelineFunction', {
      memorySize: 128,
      timeout: Duration.minutes(10),
      vpc: vpc,
      vpcSubnets: {
        subnetType: SubnetType.PRIVATE_WITH_EGRESS,
      },
      environment: {
        AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
        [STATE_MACHINE_ARN_ENV]: imagePipeline.imagePipelineArn,
      },
    });

    imagePipelineStateMachine.grantStartExecution(startPipelineFunction);


    new CfnOutput(this, 'ImagePipelineArn', {
      value: imagePipeline.imagePipelineArn,
    });

    new CfnOutput(this, 'VpcId',
      {
        value: vpc.vpcId,
        exportName: 'VpcId',
      });


  }

  /// return an AMI ID that can be used to launch an instance of this image
}