import { externalLinkStatusLabels } from '@/lib/content/external-link-taxonomy';
import {
  externalLinkStatuses,
  type ExternalLinkEditorValue,
} from '@/types/external-link';

export function ExternalLinkStatusPanel({
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
    <aside className="space-y-5 border-y border-border py-6 lg:border-t-0 lg:py-0">
      <h2 className="type-card-title text-text">Status</h2>
      <label className="block text-sm text-muted">
        Publication status
        <select value={value.status} onChange={(event) => update('status', event.target.value as ExternalLinkEditorValue['status'])} className={fieldClass}>
          {externalLinkStatuses.map((item) => <option key={item} value={item}>{externalLinkStatusLabels[item].en}</option>)}
        </select>
      </label>
      <label className="block text-sm text-muted">
        Last checked
        <input type="date" value={value.lastCheckedAt} onChange={(event) => update('lastCheckedAt', event.target.value)} className={fieldClass} required />
      </label>
      <label className="flex min-h-11 items-center gap-3 text-sm text-text-soft">
        <input type="checkbox" checked={value.isOfficial} onChange={(event) => update('isOfficial', event.target.checked)} className="size-5 accent-[var(--accent)]" />
        Official source
      </label>
      <label className="flex min-h-11 items-center gap-3 text-sm text-text-soft">
        <input type="checkbox" checked={value.isRecommended} onChange={(event) => update('isRecommended', event.target.checked)} className="size-5 accent-[var(--accent)]" />
        Recommended
      </label>
    </aside>
  );
}
