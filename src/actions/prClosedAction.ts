import S3 from '../s3Client';
import { DeleteObjectsRequest } from 'aws-sdk/clients/s3';
import validateEnvVars from '../utils/validateEnvVars';

export const requiredEnvVars = ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY'];

export default async (bucketName: string) => {
  validateEnvVars(requiredEnvVars);

  console.log('Emptying S3 bucket...');

  console.log('Fetching objects...');
  const objects = await S3.listObjectsV2({ Bucket: bucketName }).promise();

  if (objects.Contents && objects.Contents.length >= 1) {
    const deleteParams: DeleteObjectsRequest = {
      Bucket: bucketName,
      Delete: {
        Objects: []
      }
    };

    for (const object of objects.Contents) {
      deleteParams.Delete.Objects.push({ Key: object.Key });
    }

    console.log('Deleting objects...');
    await S3.deleteObjects(deleteParams).promise();
  } else {
    console.log('S3 bucket already empty.');
  }

  await S3.deleteBucket({ Bucket: bucketName }).promise();

  console.log('S3 bucket removed');
};
