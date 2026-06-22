import { ExternalLinkEditorShell } from '@/components/external-link-editor/ExternalLinkEditorShell';
import type { Locale } from '@/lib/site';

export default async function NewExternalLinkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeValue } = await params;
  const locale: Locale = localeValue === 'en' ? 'en' : 'th';
  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      <h1 className="type-page-title mb-10 text-text">
        {locale === 'th' ? 'เพิ่มลิงก์ภายนอก' : 'Add external link'}
      </h1>
      <ExternalLinkEditorShell link={null} locale={locale} />
    </div>
  );
}
