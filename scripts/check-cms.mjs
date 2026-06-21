import { existsSync } from 'node:fs';
import process from 'node:process';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { createClient } from '@supabase/supabase-js';

for (const envFile of ['.env', '.env.local']) {
  if (existsSync(envFile)) process.loadEnvFile(envFile);
}

function required(name, fallbackName) {
  const value = process.env[name] || process.env[fallbackName];
  if (!value) {
    throw new Error(
      `Missing ${name}${fallbackName ? ` or ${fallbackName}` : ''}`
    );
  }
  return value;
}

async function checkSupabase() {
  const supabase = createClient(
    required('NEXT_PUBLIC_SUPABASE_URL'),
    required(
      'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY'
    ),
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
  const { error } = await supabase
    .from('article_publications')
    .select('id')
    .limit(1);

  if (error) throw new Error(`Supabase: ${error.message}`);
}

async function checkR2() {
  const client = new S3Client({
    region: 'auto',
    endpoint: required('R2_ENDPOINT'),
    credentials: {
      accessKeyId: required('R2_ACCESS_KEY_ID'),
      secretAccessKey: required('R2_SECRET_ACCESS_KEY'),
    },
  });
  const bucket = required('R2_BUCKET_NAME');
  const key = `_cms-health/${Date.now()}-${crypto.randomUUID()}.txt`;

  try {
    await client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: 'ok',
        ContentType: 'text/plain',
      })
    );
    const response = await client.send(
      new GetObjectCommand({ Bucket: bucket, Key: key })
    );
    const body = response.Body
      ? await response.Body.transformToString('utf-8')
      : '';

    if (body !== 'ok') throw new Error('R2 read-back did not match.');
  } finally {
    await client
      .send(new DeleteObjectCommand({ Bucket: bucket, Key: key }))
      .catch(() => undefined);
  }
}

const checks = [
  ['Supabase publication index', checkSupabase],
  ['R2 private content store', checkR2],
];
let failed = false;

for (const [label, check] of checks) {
  try {
    await check();
    console.log(`✓ ${label}`);
  } catch (error) {
    failed = true;
    console.error(`✗ ${label}: ${error instanceof Error ? error.message : error}`);
  }
}

if (failed) process.exitCode = 1;
