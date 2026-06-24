import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import process from 'node:process';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { createClient } from '@supabase/supabase-js';

// Relative imports from content folder
import { thaiConcepts } from '../content/concepts/th/index';
import { thaiSeries } from '../content/series/th';

for (const envFile of ['.env', '.env.local']) {
  if (existsSync(envFile)) process.loadEnvFile(envFile);
}

function required(name: string, fallbackName?: string): string {
  const value = process.env[name] || (fallbackName ? process.env[fallbackName] : undefined);
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

function argument(name: string): string | undefined {
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

const inputOwnerId = argument('owner-id') || process.env.STUDIO_SEED_OWNER_ID;
const ownerName =
  argument('owner-name') ||
  process.env.STUDIO_SEED_OWNER_NAME ||
  'Phasin Pasumart';

const supabase = createClient(
  required('NEXT_PUBLIC_SUPABASE_URL'),
  required('SUPABASE_SECRET_KEY', 'SUPABASE_SERVICE_ROLE_KEY'),
  { auth: { autoRefreshToken: false, persistSession: false } }
);

const r2 = new S3Client({
  region: 'auto',
  endpoint: required('R2_ENDPOINT'),
  credentials: {
    accessKeyId: required('R2_ACCESS_KEY_ID'),
    secretAccessKey: required('R2_SECRET_ACCESS_KEY'),
  },
});
const bucket = required('R2_BUCKET_NAME');

function hash(content: string): string {
  return createHash('sha256').update(content).digest('hex');
}

async function seedConcepts(ownerId: string) {
  console.log(`Seeding ${(thaiConcepts as any[]).length} concepts...`);
  const now = new Date().toISOString();

  for (const concept of (thaiConcepts as any[])) {
    const markdownBody = `## คำอธิบายให้เห็นภาพ\n${concept.humanExplanation}\n\n## ความหมายทางวิชาการ / เทคนิค\n${concept.technicalExplanation}`;
    const contentHash = hash(markdownBody);
    const id = concept.id;
    const prefix = `wiki/${encodeURIComponent(ownerId)}/${encodeURIComponent(id)}`;
    
    const markdownKey = `${prefix}/article.md`;
    const publishedKey = `${prefix}/published.md`;
    const metadataKey = `${prefix}/meta.json`;

    const metadata = {
      schemaVersion: 3,
      id,
      publicId: id,
      ownerId,
      authorName: ownerName,
      title: concept.title,
      subtitle: concept.originalTerm || "",
      slug: concept.slug,
      locale: concept.language,
      excerpt: concept.shortDefinition,
      category: concept.category,
      school: concept.tradition || "",
      difficulty: concept.difficulty === 'academic' ? 'advanced' : (concept.difficulty || 'intermediate'),
      sourceStatus: "original",
      coverImage: null,
      tags: [],
      aliases: [],
      outgoingLinks: [],
      relatedConcepts: concept.relatedConcepts.map((r: any) => ({ slug: r.slug, title: r.title })),
      relatedArticles: concept.relatedArticles,
      references: concept.references,
      seoTitle: concept.seoTitle || concept.title,
      seoDescription: concept.seoDescription || concept.shortDefinition,
      translations: concept.translations || {},
      featured: false,
      status: "published",
      markdownKey,
      contentHash,
      publishedContentHash: contentHash,
      publishedSlug: concept.slug,
      readingMinutes: 5,
      createdAt: now,
      updatedAt: now,
      publishedAt: now,
      postType: "concept",
      originalTerm: concept.originalTerm,
      thaiTerm: concept.thaiTerm,
      shortDefinition: concept.shortDefinition,
      tradition: concept.tradition,
      thinkers: concept.thinkers,
      commonMisunderstandings: concept.commonMisunderstandings,
      examples: concept.examples,
      entryType: concept.entryType
    };

    console.log(`Uploading concept to R2: ${concept.slug}`);
    await Promise.all([
      r2.send(new PutObjectCommand({
        Bucket: bucket,
        Key: markdownKey,
        Body: markdownBody,
        ContentType: 'text/markdown; charset=utf-8',
        CacheControl: 'private, no-store',
      })),
      r2.send(new PutObjectCommand({
        Bucket: bucket,
        Key: publishedKey,
        Body: markdownBody,
        ContentType: 'text/markdown; charset=utf-8',
        CacheControl: 'public, max-age=3600',
      })),
      r2.send(new PutObjectCommand({
        Bucket: bucket,
        Key: metadataKey,
        Body: JSON.stringify(metadata, null, 2),
        ContentType: 'application/json; charset=utf-8',
        CacheControl: 'private, no-store',
      }))
    ]);

    // Format DB fields
    const dbDifficulty = concept.difficulty === 'academic' ? 'advanced' : (concept.difficulty || 'intermediate');
    const dbTags = [
      'post-type:concept',
      `entry-type:${concept.entryType || 'concept'}`,
      `original-term:${concept.originalTerm}`,
      `thai-term:${concept.thaiTerm}`
    ];
    if (concept.tradition) dbTags.push(`tradition:${concept.tradition}`);
    if (concept.thinkers) concept.thinkers.forEach((t: any) => dbTags.push(`thinker:${t}`));
    if (concept.commonMisunderstandings) concept.commonMisunderstandings.forEach((m: any) => dbTags.push(`misunderstanding:${m}`));
    if (concept.examples) concept.examples.forEach((e: any) => dbTags.push(`example:${e}`));

    const allowedSchools = [
      'Analytical Psychology',
      'Psychoanalysis',
      'Neuroscience',
      'Social Psychology',
      'Philosophy',
      'Philosophy of Mind',
      'Typology',
      'TPDT'
    ];
    const categorySchools: Record<string, string> = {
      'analytical-psychology': 'Analytical Psychology',
      psychoanalysis: 'Psychoanalysis',
      neuroscience: 'Neuroscience',
      'social-psychology': 'Social Psychology',
      philosophy: 'Philosophy',
      'philosophy-of-mind': 'Philosophy of Mind',
      typology: 'Typology',
      tpdt: 'TPDT',
    };
    const dbSchool = allowedSchools.includes(concept.tradition || '')
      ? concept.tradition
      : (categorySchools[concept.category] || 'Analytical Psychology');

    const dbRow = {
      id,
      slug: concept.slug,
      language: concept.language,
      status: 'published',
      title: concept.title,
      subtitle: concept.originalTerm || '',
      excerpt: concept.shortDefinition,
      category: concept.category,
      school: dbSchool,
      difficulty: dbDifficulty,
      reading_time: 5,
      published_at: now,
      updated_at: now,
      author: ownerName,
      cover_image: null,
      cover_url: null,
      cover_path: null,
      cover_alt: null,
      tags: dbTags,
      aliases: [],
      related_concepts: concept.relatedConcepts.map((r: any) => ({ slug: r.slug, title: r.title, relation: r.relation })),
      related_articles: concept.relatedArticles,
      references: concept.references,
      series_id: null,
      seo_title: concept.seoTitle || concept.title,
      seo_description: concept.seoDescription || concept.shortDefinition,
      translations: concept.translations || {},
      featured: false,
      markdown_key: markdownKey,
      content_hash: contentHash
    };

    console.log(`Upserting concept to Supabase: ${concept.slug}`);
    const { error } = await supabase
      .from('article_publications')
      .upsert(dbRow, { onConflict: 'id' });

    if (error) {
      console.error(`ERROR seeding concept ${concept.slug}:`, error.message);
      throw error;
    }
  }
}

async function seedSeries(ownerId: string) {
  console.log(`Seeding ${(thaiSeries as any).length} series...`);
  const now = new Date().toISOString();

  for (const series of (thaiSeries as any)) {
    const markdownBody = series.introduction;
    const contentHash = hash(markdownBody);
    const id = series.id;
    const prefix = `wiki/${encodeURIComponent(ownerId)}/${encodeURIComponent(id)}`;
    
    const markdownKey = `${prefix}/article.md`;
    const publishedKey = `${prefix}/published.md`;
    const metadataKey = `${prefix}/meta.json`;

    const metadata = {
      schemaVersion: 3,
      id,
      publicId: id,
      ownerId,
      authorName: series.author || ownerName,
      title: series.title,
      subtitle: series.subtitle || "",
      slug: series.slug,
      locale: series.language,
      excerpt: series.description,
      category: series.category === 'comparative-psychology' ? 'analytical-psychology' : series.category,
      school: "Analytical Psychology",
      difficulty: series.difficulty === 'advanced' ? 'advanced' : (series.difficulty || 'intermediate'),
      sourceStatus: "original",
      coverImage: series.coverImage,
      tags: [],
      aliases: [],
      outgoingLinks: [],
      relatedConcepts: [],
      relatedArticles: [],
      references: [],
      seoTitle: series.seoTitle || series.title,
      seoDescription: series.seoDescription || series.description,
      translations: series.translations || {},
      featured: false,
      status: "published",
      markdownKey,
      contentHash,
      publishedContentHash: contentHash,
      publishedSlug: series.slug,
      readingMinutes: series.estimatedReadingTime,
      createdAt: now,
      updatedAt: now,
      publishedAt: now,
      postType: "series",
      items: series.items
    };

    console.log(`Uploading series to R2: ${series.slug}`);
    await Promise.all([
      r2.send(new PutObjectCommand({
        Bucket: bucket,
        Key: markdownKey,
        Body: markdownBody,
        ContentType: 'text/markdown; charset=utf-8',
        CacheControl: 'private, no-store',
      })),
      r2.send(new PutObjectCommand({
        Bucket: bucket,
        Key: publishedKey,
        Body: markdownBody,
        ContentType: 'text/markdown; charset=utf-8',
        CacheControl: 'public, max-age=3600',
      })),
      r2.send(new PutObjectCommand({
        Bucket: bucket,
        Key: metadataKey,
        Body: JSON.stringify(metadata, null, 2),
        ContentType: 'application/json; charset=utf-8',
        CacheControl: 'private, no-store',
      }))
    ]);

    const dbDifficulty = series.difficulty === 'advanced' ? 'advanced' : (series.difficulty || 'intermediate');
    const dbTags = [
      'post-type:series',
      `series-category:${series.category}`
    ];

    const dbRow = {
      id,
      slug: series.slug,
      language: series.language,
      status: 'published',
      title: series.title,
      subtitle: series.subtitle || '',
      excerpt: series.description,
      category: series.category === 'comparative-psychology' ? 'analytical-psychology' : series.category,
      school: 'Analytical Psychology',
      difficulty: dbDifficulty,
      reading_time: series.estimatedReadingTime,
      published_at: now,
      updated_at: now,
      author: series.author || ownerName,
      cover_image: series.coverImage,
      cover_url: series.coverImage?.src || null,
      cover_path: series.coverImage?.path || null,
      cover_alt: series.coverImage?.alt || null,
      tags: dbTags,
      aliases: [],
      related_concepts: [],
      related_articles: [],
      references: series.items, // store items inside references JSONB column for series
      series_id: null,
      seo_title: series.seoTitle || series.title,
      seo_description: series.seoDescription || series.description,
      translations: series.translations || {},
      featured: false,
      markdown_key: markdownKey,
      content_hash: contentHash
    };

    console.log(`Upserting series to Supabase: ${series.slug}`);
    const { error } = await supabase
      .from('article_publications')
      .upsert(dbRow, { onConflict: 'id' });

    if (error) {
      console.error(`ERROR seeding series ${series.slug}:`, error.message);
      throw error;
    }
  }
}

async function main() {
  try {
    let ownerId = inputOwnerId;
    if (!ownerId) {
      console.log('No owner ID supplied. Querying database for an existing publication...');
      const { data, error } = await supabase
        .from('article_publications')
        .select('markdown_key')
        .limit(1);
      
      const matched = data?.find(row => row.markdown_key && row.markdown_key.startsWith('wiki/'));
      if (error) {
        console.error('Failed to query existing publications:', error.message);
      } else if (matched?.markdown_key) {
        const parts = matched.markdown_key.split('/');
        if (parts[0] === 'wiki' && parts[1]) {
          ownerId = decodeURIComponent(parts[1]);
          console.log(`Found existing owner ID from database: ${ownerId}`);
        }
      }
    }

    if (!ownerId) {
      console.error('ERROR: Pass --owner-id <Clerk user id> or set STUDIO_SEED_OWNER_ID.');
      process.exit(1);
    }

    await seedConcepts(ownerId);
    await seedSeries(ownerId);
    console.log('Successfully completed seeding all concepts and series!');
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

void main();
