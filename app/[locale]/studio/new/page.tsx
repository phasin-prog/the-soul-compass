import type { Locale } from '@/lib/site';
import { CreateArticleForm } from '@/components/wiki/CreateArticleForm';
import { requireStudioUser } from '@/lib/auth/studio';

export default async function NewArticlePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeValue } = await params;
  const locale: Locale = localeValue === 'en' ? 'en' : 'th';
  await requireStudioUser(locale);

  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-[-0.025em] text-text">
          สร้างบทความใหม่
        </h1>
        <p className="mt-2 text-muted">
          ระบบจะสร้างไฟล์ Markdown และ metadata ใน R2 ก่อน จากนั้นคุณค่อยเขียน
          เชื่อม และเผยแพร่
        </p>
      </header>
      <div className="rounded-xl bg-surface p-6 sm:p-8">
        <CreateArticleForm locale={locale} />
      </div>
    </div>
  );
}
