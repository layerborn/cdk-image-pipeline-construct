import { App } from 'aws-cdk-lib';
import { CustomResourceLambdaStack } from './CustomResourceLambdaStack';
import { ImageBuilderTestStack } from './ImageBuilderTestStack';

const app = new App();

const imagebuilderTestStack = new ImageBuilderTestStack(app, 'ImageBuilderTestStackSimple', {
  vpcCidr: '12.0.0.0/16',
  env: {
    account: process.env.AWS_ACCOUNT,
    region: process.env.AWS_REGION,
  },
});

const customResourceLambdaStack = new CustomResourceLambdaStack(app, 'CustomResourceLambdaStack', {
  vpcCidr: '13.0.0.0/16',
  env: {
    account: process.env.AWS_ACCOUNT,
    region: process.env.AWS_REGION,
  },
});


const customResource2LambdaStack = new CustomResourceLambdaStack(app, 'CustomResourceLambda2Stack', {
  vpcCidr: '14.0.0.0/16',
  env: {
    account: process.env.AWS_ACCOUNT,
    region: process.env.AWS_REGION,
  },
});


app.synth();

if (imagebuilderTestStack || customResourceLambdaStack || customResource2LambdaStack) {
  console.log('Stack Synthesized Successfully');
}