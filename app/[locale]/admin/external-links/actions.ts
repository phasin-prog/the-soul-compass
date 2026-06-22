'use server';

import { randomUUID } from 'node:crypto';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { requireEditorialUser } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/supabase/admin';
import type { Locale } from '@/lib/site';
import {
  externalLinkCategories,
  externalLinkStatuses,
  externalLinkTypes,
  type ExternalLinkEditorValue,
} from '@/types/external-link';

const schema = z.object({
  slug: z.string().trim().min(1).max(180).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  name: z.string().trim().min(1).max(180),
  abbreviation: z.string().trim().max(30),
  descriptionTh: z.string().trim().min(1).max(500),
  descriptionEn: z.string().trim().min(1).max(500),
  url: z.url(),
  category: z.enum(externalLinkCategories),
  linkType: z.enum(externalLinkTypes),
  authorityNoteTh: z.string().trim().max(500),
  authorityNoteEn: z.string().trim().max(500),
  language: z.string().trim().min(1).max(80),
  country: z.string().trim().min(1).max(80),
  isOfficial: z.boolean(),
  isRecommended: z.boolean(),
  status: z.enum(externalLinkStatuses),
  lastCheckedAt: z.string().date(),
});

export type ExternalLinkActionResult = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  id?: string;
  fieldErrors?: Record<string, string[] | undefined>;
};

export async function saveExternalLink(
  id: string | null,
  localeValue: string,
  input: ExternalLinkEditorValue
): Promise<ExternalLinkActionResult> {
  const locale: Locale = localeValue === 'en' ? 'en' : 'th';
  await requireEditorialUser(locale);
  const parsed = schema.safeParse(input);

  if (!parsed.success) {
    return {
      status: 'error',
      message: locale === 'th' ? 'กรุณาตรวจข้อมูลอีกครั้ง' : 'Check the form fields.',
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const now = new Date().toISOString();
  const linkId = id || randomUUID();
  const { data, error } = await getSupabaseAdmin()
    .from('external_links')
    .upsert({
      id: linkId,
      slug: parsed.data.slug,
      name: parsed.data.name,
      abbreviation: parsed.data.abbreviation || null,
      description: {
        th: parsed.data.descriptionTh,
        en: parsed.data.descriptionEn,
      },
      url: parsed.data.url,
      category: parsed.data.category,
      link_type: parsed.data.linkType,
      authority_note: {
        th: parsed.data.authorityNoteTh,
        en: parsed.data.authorityNoteEn,
      },
      language: parsed.data.language,
      country: parsed.data.country,
      is_official: parsed.data.isOfficial,
      is_recommended: parsed.data.isRecommended,
      status: parsed.data.status,
      last_checked_at: parsed.data.lastCheckedAt,
      updated_at: now,
    })
    .select('id')
    .single();

  if (error) {
    return {
      status: 'error',
      message: error.message.includes('external_links')
        ? locale === 'th'
          ? 'ยังไม่พบตาราง external_links โปรดรัน migration'
          : 'Run the external_links migration first.'
        : error.message,
    };
  }

  revalidatePath(`/${locale}/external-links`);
  revalidatePath(`/${locale}/admin/external-links`);
  return {
    status: 'success',
    message: locale === 'th' ? 'บันทึกลิงก์แล้ว' : 'Link saved.',
    id: data.id,
  };
}
