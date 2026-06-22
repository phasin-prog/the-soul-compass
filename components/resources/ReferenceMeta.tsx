import {
  referenceCategoryLabels,
  referenceSourceLevelLabels,
  referenceSourceLevelStyles,
  referenceTypeLabels,
} from '@/lib/content/reference-taxonomy';
import type { Locale } from '@/lib/site';
import type { Reference } from '@/types/reference';

interface ReferenceMetaProps {
  compact?: boolean;
  locale: Locale;
  reference: Reference;
}

export function ReferenceMeta({
  compact = false,
  locale,
  reference,
}: ReferenceMetaProps) {
  if (compact) {
    return (
      <dl className="type-meta flex flex-wrap gap-x-5 gap-y-2 text-muted">
        <div>
          <dt className="sr-only">{locale === 'th' ? 'ผู้เขียน' : 'Author'}</dt>
          <dd className="text-text-soft">{reference.author}</dd>
        </div>
        {reference.year ? (
          <div>
            <dt className="sr-only">{locale === 'th' ? 'ปี' : 'Year'}</dt>
            <dd>{reference.year}</dd>
          </div>
        ) : null}
        <div>
          <dt className="sr-only">{locale === 'th' ? 'ประเภท' : 'Type'}</dt>
          <dd>{referenceTypeLabels[reference.type][locale]}</dd>
        </div>
        <div>
          <dt className="sr-only">
            {locale === 'th' ? 'ระดับแหล่งข้อมูล' : 'Source level'}
          </dt>
          <dd
            className={`inline-flex min-h-7 items-center rounded-full border px-2.5 ${referenceSourceLevelStyles[reference.sourceLevel]}`}
          >
            {referenceSourceLevelLabels[reference.sourceLevel][locale]}
          </dd>
        </div>
        <div>
          <dt className="sr-only">{locale === 'th' ? 'หมวด' : 'Category'}</dt>
          <dd>{referenceCategoryLabels[reference.category][locale]}</dd>
        </div>
        <div>
          <dt className="sr-only">
            {locale === 'th' ? 'สำนัก / กรอบ' : 'Tradition'}
          </dt>
          <dd>{reference.tradition}</dd>
        </div>
      </dl>
    );
  }

  const rows = [
    [locale === 'th' ? 'ผู้เขียน' : 'Author', reference.author],
    [locale === 'th' ? 'ปีเผยแพร่ครั้งแรก' : 'Original year', reference.year],
    [locale === 'th' ? 'ภาษาเดิม' : 'Original language', reference.language],
    [
      locale === 'th' ? 'ประเภทเอกสาร' : 'Resource type',
      referenceTypeLabels[reference.type][locale],
    ],
    [
      locale === 'th' ? 'ระดับแหล่งข้อมูล' : 'Source level',
      referenceSourceLevelLabels[reference.sourceLevel][locale],
    ],
    [
      locale === 'th' ? 'หมวดความรู้' : 'Category',
      referenceCategoryLabels[reference.category][locale],
    ],
    [locale === 'th' ? 'สำนัก / กรอบทฤษฎี' : 'Tradition', reference.tradition],
  ].filter((row): row is [string, string | number] => row[1] !== null);

  return (
    <dl className="border-y border-border">
      {rows.map(([label, value]) => (
        <div
          key={label}
          className="grid gap-1 border-t border-border py-4 first:border-t-0 sm:grid-cols-[9rem_minmax(0,1fr)]"
        >
          <dt className="type-meta text-muted">{label}</dt>
          <dd className="text-text-soft">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
