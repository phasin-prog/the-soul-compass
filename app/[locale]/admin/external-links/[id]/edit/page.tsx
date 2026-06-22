import { notFound } from 'next/navigation';
import { ExternalLinkEditorShell } from '@/components/external-link-editor/ExternalLinkEditorShell';
import { getAdminExternalLink } from '@/lib/external-links';
import type { Locale } from '@/lib/site';

export const dynamic = 'force-dynamic';

export default async function EditExternalLinkPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale: localeValue, id } = await params;
  const locale: Locale = localeValue === 'en' ? 'en' : 'th';
  const link = await getAdminExternalLink(id);
  if (!link) notFound();
  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      <h1 className="type-page-title mb-10 text-text">
        {locale === 'th' ? 'แก้ไขลิงก์ภายนอก' : 'Edit external link'}
      </h1>
      <ExternalLinkEditorShell link={link} locale={locale} />
    </div>
  );
}
