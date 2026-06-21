import type { Metadata } from 'next';
import { ArticleLayout } from '@/components/ArticleLayout';
import { categories } from '@/lib/content/categories';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

// Placeholder - will be replaced with real data fetching
async function getArticle(slug: string) {
  // TODO: Implement real data fetching
  return null;
}

export async function generateStaticParams() {
  // TODO: Implement when we have real articles
  return [];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const localeKey = (locale === 'th' || locale === 'en') ? locale : 'th';

  // TODO: Fetch real article data
  return {
    title: 'Article Title',
    description: 'Article description',
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const localeKey = (locale === 'th' || locale === 'en') ? locale : 'th';

  // TODO: Fetch real article
  const article = await getArticle(slug);

  // For now, show placeholder
  const category = categories['analytical-psychology'];

  return (
    <ArticleLayout
      title={
        localeKey === 'th'
          ? 'ตัวอย่างบทความ'
          : 'Sample Article Title'
      }
      category={category.name[localeKey]}
      categoryColor={category.color}
      publishedAt="2024-01-15"
      readingTime={8}
      locale={localeKey}
    >
      {/* Placeholder Content */}
      <p className="type-lead mb-6 text-text">
        {localeKey === 'th'
          ? 'นี่คือตัวอย่างบทความ เนื้อหาจริงจะถูกเพิ่มเข้ามาในภายหลัง'
          : 'This is a sample article. Real content will be added later.'}
      </p>

      <h2>
        {localeKey === 'th' ? 'หัวข้อย่อย' : 'Subheading'}
      </h2>
      <p>
        {localeKey === 'th'
          ? 'เนื้อหาบทความจะมีการจัดรูปแบบที่เหมาะสมสำหรับการอ่านแบบยาว ด้วย typography ที่ชัดเจนและระยะห่างที่เหมาะสม'
          : 'Article content will be properly formatted for long-form reading, with clear typography and appropriate spacing.'}
      </p>

      <p>
        {localeKey === 'th'
          ? 'บทความจริงจะมีเนื้อหาเชิงลึกเกี่ยวกับจิตวิทยา จิตวิเคราะห์ และปรัชญา'
          : 'Real articles will contain in-depth content about psychology, psychoanalysis, and philosophy.'}
      </p>
    </ArticleLayout>
  );
}
