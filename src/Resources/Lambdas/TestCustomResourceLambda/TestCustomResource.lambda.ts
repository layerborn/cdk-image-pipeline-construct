import { CdkCustomResourceEvent, CdkCustomResourceResponse, Context } from 'aws-lambda';
import { CloudFormationResponse } from '../HelperFunctions/CloudFormationResponse';

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
    response.Data = { Result: 'None' };
    new CloudFormationResponse(event, context, response.Status, response.Data, response.PhysicalResourceId).send();
  }

  try {
    const multiplyResult = event.ResourceProperties.customResourceNumber * 2;
    response.Status = 'SUCCESS';
    response.Data = { Result: multiplyResult };
    new CloudFormationResponse(event, context, response.Status, response.Data, response.PhysicalResourceId).send();
  } catch (error) {
    if (error instanceof Error) {
      response.Reason = error.message;
    }
    response.Status = 'FAILED';
    response.Data = { Result: error };
    new CloudFormationResponse(event, context, response.Status, response.Data, response.PhysicalResourceId).send();
  }
};


