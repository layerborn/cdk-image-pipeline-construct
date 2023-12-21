// eslint-disable-next-line import/no-extraneous-dependencies
import { ListBucketsCommand, S3Client } from '@aws-sdk/client-s3';
import { CdkCustomResourceEvent, CdkCustomResourceResponse, Context } from 'aws-lambda';
import { CloudFormationResponse } from '../Utilities/CloudFormationResponse';

const s3Client = new S3Client({ region: 'us-east-2' }); // Replace with your region


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


  const multiplyResult = event.ResourceProperties.customResourceNumber * 2;
  response.Status = 'SUCCESS';

  s3Client.send(new ListBucketsCommand({})).then((s3BucketCount) => {
    console.log(s3BucketCount.Buckets?.length);
    response.Data = {
      Result: multiplyResult,
      Buckets: s3BucketCount.Buckets?.length,
    };
    const cloudFormationResponse = new CloudFormationResponse(event, context, response.Status, response.Data, response.PhysicalResourceId);
    cloudFormationResponse.sendAsync().then(() => console.log('Response sent successfully'))
      .catch(err => console.error('Error sending response:', err));
  }).catch((error) => {
    if (error instanceof Error) {
      response.Reason = error.message;
    }
    response.Status = 'FAILED';
    response.Data = {
      Result: error,
      Buckets: 'Unknown',
    };
    const cloudFormationResponse = new CloudFormationResponse(event, context, response.Status, response.Data, response.PhysicalResourceId);
    cloudFormationResponse.sendAsync().then(() => console.log('Response sent successfully'))
      .catch(err => console.error('Error sending response:', err));
  });
};


