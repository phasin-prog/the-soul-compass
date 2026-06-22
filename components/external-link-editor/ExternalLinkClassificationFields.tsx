import {
  externalLinkCategoryLabels,
  externalLinkTypeLabels,
} from '@/lib/content/external-link-taxonomy';
import {
  externalLinkCategories,
  externalLinkTypes,
  type ExternalLinkEditorValue,
} from '@/types/external-link';

export function ExternalLinkClassificationFields({
  value,
  update,
}: {
  value: ExternalLinkEditorValue;
  update: <K extends keyof ExternalLinkEditorValue>(
    key: K,
    next: ExternalLinkEditorValue[K]
  ) => void;
}) {
  const fieldClass =
    'mt-2 min-h-12 w-full rounded-lg border border-border bg-background px-4 text-text focus:border-accent';
  return (
    <fieldset className="space-y-5 border-t border-border pt-8">
      <legend className="type-section-title text-text">Classification</legend>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="text-sm text-muted">
          Category
          <select value={value.category} onChange={(event) => update('category', event.target.value as ExternalLinkEditorValue['category'])} className={fieldClass}>
            {externalLinkCategories.map((item) => <option key={item} value={item}>{externalLinkCategoryLabels[item].en}</option>)}
          </select>
        </label>
        <label className="text-sm text-muted">
          Link type
          <select value={value.linkType} onChange={(event) => update('linkType', event.target.value as ExternalLinkEditorValue['linkType'])} className={fieldClass}>
            {externalLinkTypes.map((item) => <option key={item} value={item}>{externalLinkTypeLabels[item].en}</option>)}
          </select>
        </label>
        <label className="text-sm text-muted">
          Language
          <input value={value.language} onChange={(event) => update('language', event.target.value)} className={fieldClass} required />
        </label>
        <label className="text-sm text-muted">
          Country
          <input value={value.country} onChange={(event) => update('country', event.target.value)} className={fieldClass} required />
        </label>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="text-sm text-muted">
          Authority note (TH)
          <textarea value={value.authorityNoteTh} onChange={(event) => update('authorityNoteTh', event.target.value)} className={`${fieldClass} min-h-24 py-3`} />
        </label>
        <label className="text-sm text-muted">
          Authority note (EN)
          <textarea value={value.authorityNoteEn} onChange={(event) => update('authorityNoteEn', event.target.value)} className={`${fieldClass} min-h-24 py-3`} />
        </label>
      </div>
    </fieldset>
  );
}
