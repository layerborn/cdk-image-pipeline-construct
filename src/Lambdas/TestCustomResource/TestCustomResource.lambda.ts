// eslint-disable-next-line import/no-extraneous-dependencies
import { SFNClient, StartExecutionCommand } from '@aws-sdk/client-sfn';
import { CdkCustomResourceEvent, CdkCustomResourceResponse, Context } from 'aws-lambda';
import { CloudFormationResponse } from '../../Utilities/CloudFormationResponse';

const sfnClient = new SFNClient({ region: 'us-east-2' }); // Replace with your region

export interface TestCustomResourceLambdaEnvironment {
  AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1';
  STEP_FUNCTION_ARN: string;
  IMAGE_PIPELINE_ARN: string;

  [p: string]: string;
}

export const handler = (
  event: CdkCustomResourceEvent,
  context: Context,
): void => {

  console.log('Lambda is invoked with:' + JSON.stringify(event));

  const stepFunctionArn = process.env.STEP_FUNCTION_ARN;
  const imagePipelineArn = process.env.IMAGE_PIPELINE_ARN;
  const resourceNumber = event.ResourceProperties.customResourceNumber;
  console.log('Step function ARN: ' + stepFunctionArn);

  const response: CdkCustomResourceResponse = {
    StackId: event.StackId,
    RequestId: event.RequestId,
    LogicalResourceId: event.LogicalResourceId,
    PhysicalResourceId: context.logGroupName,
    Data: {
      AmiID: 'None',
      ResourceNumber: resourceNumber + '',
    },
  };

  if (event.RequestType == 'Delete') {
    response.Status = 'SUCCESS';
    response.Data!.AmiID = 'None';
    response.Data!.ResourceNumber = '0';
    const cloudFormationResponse = new CloudFormationResponse(event, context, response.Status, response.Data, response.PhysicalResourceId);
    cloudFormationResponse.sendAsync().then(() => console.log('Response sent successfully'))
      .catch(error => console.error('Error sending response:', error));
  }

  response.Status = 'SUCCESS';

  const startExecutionCommand = new StartExecutionCommand({
    stateMachineArn: stepFunctionArn,
    input: JSON.stringify({
      clientToken: event.RequestId,
      imagePipelineArn: imagePipelineArn,
    }),
  });

  sfnClient.send(startExecutionCommand).then((output) => {
    console.log('Step function started successfully');
    console.log(output);
    response.Data!.AmiID = 'None';
    response.Data!.ResourceNumber = '0';
    new CloudFormationResponse(event, context, response.Status, response.Data, response.PhysicalResourceId).send();
  }).catch((error) => {
    if (error instanceof Error) {
      response.Reason = error.message;
    }
    response.Status = 'FAILED';
    response.Data!.AmiID = 'None';
    response.Data!.ResourceNumber = '0';
    new CloudFormationResponse(event, context, response.Status, response.Data, response.PhysicalResourceId).send();
  });

};
