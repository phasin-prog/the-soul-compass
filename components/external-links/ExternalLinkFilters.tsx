'use client';

import { useMemo, useState } from 'react';
import { ExternalLinkGrid } from '@/components/external-links/ExternalLinkGrid';
import {
  externalLinkCategoryLabels,
  externalLinkTypeLabels,
} from '@/lib/content/external-link-taxonomy';
import type { Locale } from '@/lib/site';
import {
  externalLinkCategories,
  externalLinkTypes,
  type ExternalLink,
  type ExternalLinkCategory,
  type ExternalLinkType,
} from '@/types/external-link';

type CategoryFilter = 'all' | ExternalLinkCategory;
type TypeFilter = 'all' | ExternalLinkType;
type FlagFilter = 'all' | 'official' | 'recommended';

function normalize(value: string) {
  return value.normalize('NFKC').trim().toLocaleLowerCase();
}

export function ExternalLinkFilters({
  links,
  locale,
}: {
  links: ExternalLink[];
  locale: Locale;
}) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [type, setType] = useState<TypeFilter>('all');
  const [language, setLanguage] = useState('all');
  const [country, setCountry] = useState('all');
  const [flag, setFlag] = useState<FlagFilter>('all');
  const languages = [...new Set(links.map((link) => link.language))].sort();
  const countries = [...new Set(links.map((link) => link.country))].sort();

  const filtered = useMemo(() => {
    const term = normalize(query);
    return links.filter((link) => {
      if (category !== 'all' && link.category !== category) return false;
      if (type !== 'all' && link.linkType !== type) return false;
      if (language !== 'all' && link.language !== language) return false;
      if (country !== 'all' && link.country !== country) return false;
      if (flag === 'official' && !link.isOfficial) return false;
      if (flag === 'recommended' && !link.isRecommended) return false;
      if (!term) return true;
      return normalize(
        [
          link.name,
          link.abbreviation ?? '',
          link.description.th,
          link.description.en,
          externalLinkCategoryLabels[link.category].th,
          externalLinkCategoryLabels[link.category].en,
        ].join(' ')
      ).includes(term);
    });
  }, [category, country, flag, language, links, query, type]);

  const labels =
    locale === 'th'
      ? {
          search: 'ค้นหาชื่อ ตัวย่อ หมวด หรือคำอธิบาย',
          allCategories: 'ทุกหมวด',
          allTypes: 'ทุกประเภท',
          allLanguages: 'ทุกภาษา',
          allCountries: 'ทุกประเทศ',
          allFlags: 'ทั้งหมด',
          official: 'ทางการเท่านั้น',
          recommended: 'รายการแนะนำ',
          results: `${filtered.length} ลิงก์`,
          empty: 'ไม่พบลิงก์ที่ตรงกับตัวกรอง',
        }
      : {
          search: 'Search name, abbreviation, category, or description',
          allCategories: 'All categories',
          allTypes: 'All types',
          allLanguages: 'All languages',
          allCountries: 'All countries',
          allFlags: 'All links',
          official: 'Official only',
          recommended: 'Recommended',
          results: `${filtered.length} link${filtered.length === 1 ? '' : 's'}`,
          empty: 'No links match these filters',
        };

  const inputClass =
    'min-h-12 w-full rounded-lg border border-border bg-surface px-4 text-text focus:border-accent';

  return (
    <section aria-label={locale === 'th' ? 'ตัวกรองลิงก์ภายนอก' : 'External link filters'}>
      <div className="border-y border-border py-6">
        <label htmlFor="external-link-search" className="sr-only">
          {labels.search}
        </label>
        <input
          id="external-link-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={labels.search}
          className={inputClass}
        />
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <select value={category} onChange={(event) => setCategory(event.target.value as CategoryFilter)} className={inputClass} aria-label={labels.allCategories}>
            <option value="all">{labels.allCategories}</option>
            {externalLinkCategories.map((value) => <option key={value} value={value}>{externalLinkCategoryLabels[value][locale]}</option>)}
          </select>
          <select value={type} onChange={(event) => setType(event.target.value as TypeFilter)} className={inputClass} aria-label={labels.allTypes}>
            <option value="all">{labels.allTypes}</option>
            {externalLinkTypes.map((value) => <option key={value} value={value}>{externalLinkTypeLabels[value][locale]}</option>)}
          </select>
          <select value={language} onChange={(event) => setLanguage(event.target.value)} className={inputClass} aria-label={labels.allLanguages}>
            <option value="all">{labels.allLanguages}</option>
            {languages.map((value) => <option key={value}>{value}</option>)}
          </select>
          <select value={country} onChange={(event) => setCountry(event.target.value)} className={inputClass} aria-label={labels.allCountries}>
            <option value="all">{labels.allCountries}</option>
            {countries.map((value) => <option key={value}>{value}</option>)}
          </select>
          <select value={flag} onChange={(event) => setFlag(event.target.value as FlagFilter)} className={inputClass} aria-label={labels.allFlags}>
            <option value="all">{labels.allFlags}</option>
            <option value="official">{labels.official}</option>
            <option value="recommended">{labels.recommended}</option>
          </select>
        </div>
      </div>
      <p className="type-meta flex min-h-16 items-center text-muted" aria-live="polite">
        {labels.results}
      </p>
      {filtered.length > 0 ? (
        <ExternalLinkGrid links={filtered} locale={locale} />
      ) : (
        <p className="border-y border-border py-12 text-muted">{labels.empty}</p>
      )}
    </section>
  );
}
