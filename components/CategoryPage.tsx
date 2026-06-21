import type { Locale } from '@/lib/site';
import type { Category } from '@/lib/content/categories';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { getT } from '@/lib/i18n';

interface CategoryPageProps {
  category: Category;
  locale: Locale;
  children?: React.ReactNode;
}

export function CategoryPage({ category, locale, children }: CategoryPageProps) {
  const t = getT(locale);

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="mb-12 border-b border-border py-16">
        <div className="max-w-3xl mx-auto">
          <div
            className="w-16 h-2 rounded-full mb-6"
            style={{ backgroundColor: category.color }}
          />
          <h1 className="type-page-title mb-4 text-text">
            {category.name[locale]}
          </h1>
          <p className="type-lead text-muted">
            {category.description[locale]}
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-5xl mx-auto">
        {children || (
          <>
            {/* Placeholder Articles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} hover className="opacity-50">
                  <div className="flex flex-col gap-3">
                    <Badge variant="accent">{category.name[locale]}</Badge>
                    <div className="h-12 w-full rounded-md bg-surface-soft" />
                    <div className="h-16 w-full rounded-md bg-surface-soft" />
                    <div className="flex gap-2 mt-2">
                      <div className="h-4 w-24 rounded-md bg-surface-soft" />
                      <div className="h-4 w-16 rounded-md bg-surface-soft" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Coming Soon */}
            <div className="text-center py-8">
              <p className="text-muted">{t.ui.comingSoon}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
