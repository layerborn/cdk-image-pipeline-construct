import { Stack, StackProps } from 'aws-cdk-lib';
import { AmazonLinuxEdition, AmazonLinuxGeneration, AmazonLinuxImage, IpAddresses, SubnetType, Vpc } from 'aws-cdk-lib/aws-ec2';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as stepfunctions from 'aws-cdk-lib/aws-stepfunctions';
import * as tasks from 'aws-cdk-lib/aws-stepfunctions-tasks';
import { Construct } from 'constructs';
import { ImagePipeline } from '../ImagePipeline';

if (stepfunctions || tasks || lambda) {
}


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


    new ImagePipeline(this, 'ImagePipeline', {
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


  }

  /// return an AMI ID that can be used to launch an instance of this image
}