import { App } from 'aws-cdk-lib';
import { ImageBuilderTestStack } from './ImageBuilderTestStack';

const app = new App();

const imagebuilderTestStack = new ImageBuilderTestStack(app, 'ImageBuilderTestStackSimple', {
  vpcCidr: '12.0.0.0/16',
  env: {
    account: process.env.AWS_ACCOUNT,
    region: process.env.AWS_REGION,
  },
});

app.synth();

if (imagebuilderTestStack) {
  console.log('Stack Synthesized Successfully');
}