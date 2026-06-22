import 'server-only';

import { cache } from 'react';
import { externalLinkSeeds } from '@/content/external-links';
import { getSupabaseAdmin } from '@/lib/supabase/admin';
import { getSupabasePublic } from '@/lib/supabase/public';
import type { ExternalLink } from '@/types/external-link';

type ExternalLinkRow = {
  id: string;
  slug: string;
  name: string;
  abbreviation: string | null;
  description: ExternalLink['description'];
  url: string;
  category: ExternalLink['category'];
  link_type: ExternalLink['linkType'];
  authority_note: ExternalLink['authorityNote'];
  language: string;
  country: string;
  is_official: boolean;
  is_recommended: boolean;
  status: ExternalLink['status'];
  last_checked_at: string;
  created_at: string;
  updated_at: string;
};

function fromRow(row: ExternalLinkRow): ExternalLink {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    abbreviation: row.abbreviation,
    description: row.description,
    url: row.url,
    category: row.category,
    linkType: row.link_type,
    authorityNote: row.authority_note,
    language: row.language,
    country: row.country,
    isOfficial: row.is_official,
    isRecommended: row.is_recommended,
    status: row.status,
    lastCheckedAt: row.last_checked_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mergeLinks(remote: ExternalLink[]): ExternalLink[] {
  const merged = new Map(externalLinkSeeds.map((link) => [link.id, link]));
  for (const link of remote) merged.set(link.id, link);
  return Array.from(merged.values()).sort((a, b) =>
    a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })
  );
}

async function readRemote(admin = false): Promise<ExternalLink[]> {
  try {
    const client = admin ? getSupabaseAdmin() : getSupabasePublic();
    const query = client.from('external_links').select('*');
    const { data, error } = admin
      ? await query.order('name')
      : await query.eq('status', 'active').order('name');
    if (error) throw error;
    return (data as ExternalLinkRow[]).map(fromRow);
  } catch (error) {
    if (
      error instanceof Error &&
      !error.message.includes('external_links') &&
      !error.message.includes('Missing required environment variable')
    ) {
      console.error('External links backend is unavailable.', error);
    }
    return [];
  }
}

export const getActiveExternalLinks = cache(async () =>
  mergeLinks(await readRemote()).filter((link) => link.status === 'active')
);

export async function getAdminExternalLinks(): Promise<ExternalLink[]> {
  return mergeLinks(await readRemote(true));
}

export async function getAdminExternalLink(
  id: string
): Promise<ExternalLink | null> {
  const links = await getAdminExternalLinks();
  return links.find((link) => link.id === id) ?? null;
}
