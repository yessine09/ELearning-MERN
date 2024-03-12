import { S3 } from 'aws-sdk';

import { checkBucket } from './checkBucket';
import { createBucket } from './createBucket';

import config from "../../config/configs";

/**
  * @name initBucket
  * @returns {void}
*/
export const initBucket = async (s3: S3, bucketName: string) => {
  const bucketStatus = await checkBucket(s3, bucketName);

  if (!bucketStatus.success) { // check if the bucket don't exist
    let bucket = await createBucket(s3, bucketName); // create new bucket
    console.log(bucket.message);
  }
}