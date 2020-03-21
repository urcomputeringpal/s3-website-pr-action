import S3 from '../s3Client';

export default async (bucketName: string) => {
  try {
    await S3.headBucket({ Bucket: bucketName }).promise();
    return true;
  } catch (e) {
    return false;
  }
};
