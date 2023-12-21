import * as https from 'https';
import { ClientRequest, IncomingMessage } from 'node:http';
import * as url from 'url';

export const SUCCESS: string = 'SUCCESS';
export const FAILED: string = 'FAILED';

export class CloudFormationResponse {
  event: any;
  context: any;
  responseStatus: string;
  responseData: any;
  physicalResourceId?: string;
  noEcho?: boolean;

  constructor(
    event: any,
    context: any,
    responseStatus: string,
    responseData: any,
    physicalResourceId?: string,
    noEcho?: boolean,
  ) {
    this.event = event;
    this.context = context;
    this.responseStatus = responseStatus;
    this.responseData = responseData;
    this.physicalResourceId = physicalResourceId;
    this.noEcho = noEcho;
  }

  send(): void {
    const responseBody: string = JSON.stringify({
      Status: this.responseStatus,
      Reason: 'See the details in CloudWatch Log Stream: ' + this.context.logStreamName,
      PhysicalResourceId: this.physicalResourceId || this.context.logStreamName,
      StackId: this.event.StackId,
      RequestId: this.event.RequestId,
      LogicalResourceId: this.event.LogicalResourceId,
      NoEcho: this.noEcho || false,
      Data: this.responseData,
    });

    console.log('Response body:\n', responseBody);

    const parsedUrl: url.UrlWithStringQuery = url.parse(this.event.ResponseURL);
    const options: https.RequestOptions = {
      hostname: parsedUrl.hostname,
      port: 443,
      path: parsedUrl.path,
      method: 'PUT',
      headers: {
        'content-type': '',
        'content-length': responseBody.length,
      },
    };
    const context = this.context;
    const request: ClientRequest = https.request(options, function (response: IncomingMessage) {
      console.log('Status code: ' + parseInt(response.statusCode as any, 10));
      context.done();
    });

    request.on('error', function (error: Error) {
      console.log('send(..) failed executing https.request(..): ' + error);
      context.done();
    });

    request.write(responseBody);
    request.end();
  }
}