import { Stack, StackProps } from 'aws-cdk-lib';
import { AmazonLinuxEdition, AmazonLinuxGeneration, AmazonLinuxImage, IpAddresses, SubnetType, Vpc } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import { ImagePipeline } from '../ImagePipeline';


export interface ImageBuilderTestStackProps extends StackProps {
  vpcCidr: string;
}

export class ImageBuilderTestStack extends Stack {
  constructor(
    scope: Construct,
    id: string,
    props: ImageBuilderTestStackProps,
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
}
