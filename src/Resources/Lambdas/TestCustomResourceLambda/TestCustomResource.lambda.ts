import * as https from 'https';
import { CloudFormationCustomResourceEvent, CloudFormationCustomResourceResponse } from 'aws-lambda';

export const handler = async (event: CloudFormationCustomResourceEvent) => {
  console.log(JSON.stringify(event, null, 2));

  const responseData: { [key: string]: any } = {};
  let responseStatus: 'SUCCESS' | 'FAILED' = 'FAILED';

  try {
    switch (event.RequestType) {
      case 'Create':
      case 'Update':
        // Add your logic here
        responseData.TestMessage = 'Hello world';
        responseStatus = 'SUCCESS';
        break;
      case 'Delete':
        // Handle delete logic if necessary
        responseStatus = 'SUCCESS';
        break;
      default:
        throw new Error('Unknown request type');
    }

    return await sendResponse(event, responseStatus, responseData);
  } catch (error: any) {
    console.error('Error:', error);
    return await sendResponse(event, responseStatus, { Error: error.message });
  }
};

function sendResponse(event: CloudFormationCustomResourceEvent, status: 'SUCCESS' | 'FAILED', data: object): Promise<void> {
  const responseBody: CloudFormationCustomResourceResponse = {
    Status: status,
    Reason: 'See the details in CloudWatch Log Stream.',
    PhysicalResourceId: event.LogicalResourceId,
    StackId: event.StackId,
    RequestId: event.RequestId,
    LogicalResourceId: event.LogicalResourceId,
    Data: data,
  };

  const jsonString = JSON.stringify(responseBody);
  const parsedUrl = new URL(event.ResponseURL);

  return new Promise((resolve, reject) => {
    const requestOptions = {
      hostname: parsedUrl.hostname,
      port: 443,
      path: parsedUrl.pathname + parsedUrl.search,
      method: 'PUT',
      headers: {
        'content-type': '',
        'content-length': jsonString.length,
      },
    };

    const request = https.request(requestOptions, (response) => {
      response.on('end', () => {
        resolve();
      });
    });

    request.on('error', (error) => {
      reject(`sendResponse Error:${error}`);
    });

    request.write(jsonString);
    request.end();
  });
}
