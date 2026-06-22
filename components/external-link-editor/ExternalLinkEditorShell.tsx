'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { saveExternalLink } from '@/app/[locale]/admin/external-links/actions';
import { ExternalLinkClassificationFields } from '@/components/external-link-editor/ExternalLinkClassificationFields';
import { ExternalLinkIdentityFields } from '@/components/external-link-editor/ExternalLinkIdentityFields';
import { ExternalLinkStatusPanel } from '@/components/external-link-editor/ExternalLinkStatusPanel';
import type { Locale } from '@/lib/site';
import type { ExternalLink, ExternalLinkEditorValue } from '@/types/external-link';

function toEditorValue(link: ExternalLink | null): ExternalLinkEditorValue {
  return {
    slug: link?.slug ?? '',
    name: link?.name ?? '',
    abbreviation: link?.abbreviation ?? '',
    descriptionTh: link?.description.th ?? '',
    descriptionEn: link?.description.en ?? '',
    url: link?.url ?? '',
    category: link?.category ?? 'other',
    linkType: link?.linkType ?? 'other',
    authorityNoteTh: link?.authorityNote.th ?? '',
    authorityNoteEn: link?.authorityNote.en ?? '',
    language: link?.language ?? 'English',
    country: link?.country ?? 'International',
    isOfficial: link?.isOfficial ?? false,
    isRecommended: link?.isRecommended ?? false,
    status: link?.status ?? 'needs_review',
    lastCheckedAt: link?.lastCheckedAt.slice(0, 10) ?? new Date().toISOString().slice(0, 10),
  };
}

export function ExternalLinkEditorShell({
  link,
  locale,
}: {
  link: ExternalLink | null;
  locale: Locale;
}) {
  const router = useRouter();
  const [value, setValue] = useState(() => toEditorValue(link));
  const [message, setMessage] = useState('');
  const [pending, startTransition] = useTransition();
  const update = <K extends keyof ExternalLinkEditorValue>(
    key: K,
    next: ExternalLinkEditorValue[K]
  ) => setValue((current) => ({ ...current, [key]: next }));

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        startTransition(async () => {
          const result = await saveExternalLink(link?.id ?? null, locale, value);
          setMessage(result.message ?? '');
          if (result.status === 'success' && result.id) {
            router.replace(`/${locale}/admin/external-links/${result.id}/edit`);
            router.refresh();
          }
        });
      }}
      className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]"
    >
      <div className="space-y-10">
        <ExternalLinkIdentityFields value={value} update={update} />
        <ExternalLinkClassificationFields value={value} update={update} />
      </div>
      <div>
        <ExternalLinkStatusPanel value={value} update={update} />
        <button disabled={pending} className="mt-6 min-h-12 w-full rounded-lg bg-accent px-5 font-semibold text-accent-ink disabled:opacity-50">
          {pending ? 'Saving…' : locale === 'th' ? 'บันทึกลิงก์' : 'Save link'}
        </button>
        {message ? <p className="mt-4 text-sm text-muted" aria-live="polite">{message}</p> : null}
      </div>
    </form>
  );
}
