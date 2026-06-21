import 'server-only';

import { S3Client } from '@aws-sdk/client-s3';

function required(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

let client: S3Client | undefined;

export function getR2Client(): S3Client {
  if (!client) {
    client = new S3Client({
      region: 'auto',
      endpoint: required('R2_ENDPOINT'),
      credentials: {
        accessKeyId: required('R2_ACCESS_KEY_ID'),
        secretAccessKey: required('R2_SECRET_ACCESS_KEY'),
      },
    });
  }

  return client;
}

export function getR2BucketName(): string {
  return required('R2_BUCKET_NAME');
}
