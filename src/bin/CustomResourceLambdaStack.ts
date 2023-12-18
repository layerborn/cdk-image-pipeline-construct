import { CfnOutput, CustomResource, Duration, Stack, StackProps } from 'aws-cdk-lib';
import { IpAddresses, SubnetType, Vpc } from 'aws-cdk-lib/aws-ec2';
import { Provider } from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';
import { TestCustomResourceFunction } from '../Resources/Lambdas/TestCustomResourceLambda/TestCustomResource-function';


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

    const customLambdaResource = new TestCustomResourceFunction(this, 'CustomResourceLambdaStack',
      {
        functionName: 'CustomResourceLambdaStack',
        description: 'CustomResourceLambdaStack',
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


    const provider = new Provider(this, 'CustomResourceProvider', {
      onEventHandler: customLambdaResource,
    });

    const customResourceMessage = new CustomResource(this, 'CustomResource', {
      serviceToken: provider.serviceToken,
      properties: {
        ParamSendToLambda: 'Test Custom Input Param from custom resource lambda stack',
      },
    });

    new CfnOutput(this, 'CustomResourceOutput', {
      value: customResourceMessage.getAttString('TestMessage'),
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
