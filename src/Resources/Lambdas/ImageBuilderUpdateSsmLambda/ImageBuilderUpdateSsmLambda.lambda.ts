// eslint-disable-next-line import/no-extraneous-dependencies
import { SendMessageCommand, SendMessageCommandInput, SQSClient } from '@aws-sdk/client-sqs';

const region = process.env.AWS_REGION!;

export const SQS_QUEUE_URL_KEY = 'SQS_QUEUE_URL';

export const handler = async (event: any) => {
  const sqsClient = new SQSClient([{ region: region }]);
  const sqsQueueUrl = process.env[SQS_QUEUE_URL_KEY]!;
  console.log('SQS_QUEUE_URL_KEY', sqsQueueUrl);
  console.log('Received event:', JSON.stringify(event, null, 2));

  try {
    const commandInput: SendMessageCommandInput = {
      QueueUrl: sqsQueueUrl,
      MessageBody: JSON.stringify({
        S3BucketName: event.Records[0].s3.bucket.name,
        S3Key: event.Records[0].s3.object.key,
      }),
    };
    await sqsClient
      .send(new SendMessageCommand(commandInput))
      .then((data: any) => {
        console.log(data);
        return {
          statusCode: 200,
          body: JSON.stringify({
            result: 'SQS message sent successfully!',
            message: data,
          }),
        };
      })
      .catch((error: Error) => {
        console.log(error);
        return {
          statusCode: 500,
          body: JSON.stringify({
            result: 'SQS message failed to send!',
            message: error,
          }),
        };
      });
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};
