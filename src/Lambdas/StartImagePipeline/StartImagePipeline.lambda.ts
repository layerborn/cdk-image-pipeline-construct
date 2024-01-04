// eslint-disable-next-line import/no-extraneous-dependencies
import { CdkCustomResourceEvent, CdkCustomResourceResponse, Context } from 'aws-lambda';
import { CloudFormationResponse } from '../../Utilities/CloudFormationResponse';

function sleep(minutes: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, minutes * 60000));
}

export const STATE_MACHINE_ARN_ENV = 'IMAGE_PIPELINE_ARN';

export const handler = (
  event: CdkCustomResourceEvent,
  context: Context,
): void => {
  console.log('Lambda is invoked with:' + JSON.stringify(event));

  const response: CdkCustomResourceResponse = {
    StackId: event.StackId,
    RequestId: event.RequestId,
    LogicalResourceId: event.LogicalResourceId,
    PhysicalResourceId: context.logGroupName,
  };

  if (event.RequestType == 'Delete') {
    response.Status = 'SUCCESS';
    response.Data = {
      Result: 'None',
      Buckets: 'Unknown',
    };
    const cloudFormationResponse = new CloudFormationResponse(event, context, response.Status, response.Data, response.PhysicalResourceId);
    cloudFormationResponse.sendAsync().then(() => console.log('Response sent successfully'))
      .catch(error => console.error('Error sending response:', error));
  }

  response.Status = 'SUCCESS';
  const cloudFormationResponse = new CloudFormationResponse(event, context, response.Status, response.Data, response.PhysicalResourceId);
  console.log('Sleeping for 10 minutes');
  sleep(10).then(() => {
    console.log('10 minutes have passed');
    // start the step function here
    cloudFormationResponse.send();
  }).catch(error => console.error('Error sending response:', error));


};


