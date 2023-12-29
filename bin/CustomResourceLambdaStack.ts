import { CfnOutput, CustomResource, Duration, Stack, StackProps } from 'aws-cdk-lib';
import { IpAddresses, SubnetType, Vpc } from 'aws-cdk-lib/aws-ec2';
import { Effect } from 'aws-cdk-lib/aws-iam';
import { Provider } from 'aws-cdk-lib/custom-resources';
import { PolicyStatement } from 'cdk-iam-floyd';
import { Construct } from 'constructs';
import { TestCustomResourceFunction } from '../src/Resources/Lambdas/TestCustomResource/TestCustomResource-function';


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

    const customLambdaResource = new TestCustomResourceFunction(this, 'CustomResourceLambdaFunction',
      {
        description: 'CustomResourceLambdaFunctions',
        memorySize: 128,
        timeout: Duration.seconds(60),
        vpc: vpc,
        vpcSubnets: {
          subnetType: SubnetType.PRIVATE_WITH_EGRESS,
        },
        environment: {
          AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
        },
      });

    customLambdaResource.addToRolePolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ['s3:ListAllMyBuckets'],
      resources: ['*'],
    }));

    const provider = new Provider(this, 'CustomResourceProvider', {
      onEventHandler: customLambdaResource,
    });


    const result = new CustomResource(this, 'CustomResourceResult', {
      serviceToken: provider.serviceToken,
      properties: {
        customResourceNumber: 8,
      },
    });

    new CfnOutput(this, 'CustomResourceResultOutput', {
      value: result.getAttString('Result'),
    });

    new CfnOutput(this, 'CustomResourceBucketsOutput', {
      value: result.getAttString('Buckets'),
    });

    new CfnOutput(this, 'CustomResourceLambdaStackOutput', {
      value: customLambdaResource.functionName,
    });

    new CfnOutput(this, 'VpcId', {
      value: vpc.vpcId,
    });

  }

  /// return an AMI ID that can be used to launch an instance of this image
}
