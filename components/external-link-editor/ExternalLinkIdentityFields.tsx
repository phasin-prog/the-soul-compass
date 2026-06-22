import type { ExternalLinkEditorValue } from '@/types/external-link';

export function ExternalLinkIdentityFields({
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
    <fieldset className="space-y-5">
      <legend className="type-section-title text-text">Identity</legend>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="text-sm text-muted">
          Name
          <input value={value.name} onChange={(event) => update('name', event.target.value)} className={fieldClass} required />
        </label>
        <label className="text-sm text-muted">
          Abbreviation
          <input value={value.abbreviation} onChange={(event) => update('abbreviation', event.target.value)} className={fieldClass} />
        </label>
      </div>
      <label className="block text-sm text-muted">
        Slug
        <input value={value.slug} onChange={(event) => update('slug', event.target.value)} className={fieldClass} required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" />
      </label>
      <label className="block text-sm text-muted">
        URL
        <input type="url" value={value.url} onChange={(event) => update('url', event.target.value)} className={fieldClass} required />
      </label>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="text-sm text-muted">
          คำอธิบายภาษาไทย
          <textarea value={value.descriptionTh} onChange={(event) => update('descriptionTh', event.target.value)} className={`${fieldClass} min-h-28 py-3`} required />
        </label>
        <label className="text-sm text-muted">
          English description
          <textarea value={value.descriptionEn} onChange={(event) => update('descriptionEn', event.target.value)} className={`${fieldClass} min-h-28 py-3`} required />
        </label>
      </div>
    </fieldset>
  );
}
