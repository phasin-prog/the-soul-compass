import type { ReactNode } from 'react';
import { SoulIcon, type SoulIconName } from '@/components/icons/SoulIcon';

export type MarkdownCalloutType =
  | 'concept'
  | 'definition'
  | 'source'
  | 'quote'
  | 'warning'
  | 'caution'
  | 'reflection'
  | 'question'
  | 'comparison'
  | 'note'
  | 'jungian'
  | 'psychoanalysis'
  | 'philosophy'
  | 'series'
  | 'difficulty';

const calloutStyles: Record<
  MarkdownCalloutType,
  { icon: SoulIconName; accent: string }
> = {
  concept: {
    icon: 'concept',
    accent: 'border-accent/35 bg-accent-soft text-accent',
  },
  definition: {
    icon: 'definition',
    accent: 'border-celadon/35 bg-celadon/5 text-celadon',
  },
  source: {
    icon: 'source',
    accent: 'border-blue/35 bg-blue/5 text-blue',
  },
  quote: {
    icon: 'quote',
    accent: 'border-plum/35 bg-plum/5 text-plum',
  },
  warning: {
    icon: 'warning',
    accent: 'border-clay/35 bg-clay/5 text-clay',
  },
  caution: {
    icon: 'warning',
    accent: 'border-clay/45 bg-clay/8 text-clay',
  },
  reflection: {
    icon: 'shadow',
    accent: 'border-blue/35 bg-blue/5 text-blue',
  },
  question: {
    icon: 'question',
    accent: 'border-accent/35 bg-accent-soft text-accent',
  },
  comparison: {
    icon: 'comparison',
    accent: 'border-celadon/35 bg-celadon/5 text-celadon',
  },
  note: {
    icon: 'note',
    accent: 'border-border bg-surface-raised text-muted',
  },
  jungian: {
    icon: 'compass',
    accent: 'border-accent/40 bg-accent-soft text-accent',
  },
  psychoanalysis: {
    icon: 'complex',
    accent: 'border-plum/35 bg-plum/5 text-plum',
  },
  philosophy: {
    icon: 'philosophy',
    accent: 'border-celadon/35 bg-celadon/5 text-celadon',
  },
  series: {
    icon: 'depth',
    accent: 'border-plum/35 bg-plum/5 text-plum',
  },
  difficulty: {
    icon: 'compass',
    accent: 'border-blue/35 bg-blue/5 text-blue',
  },
};

interface MarkdownCalloutProps {
  type: MarkdownCalloutType;
  title?: string;
  children: ReactNode;
  className?: string;
  locale?: string;
}

export function MarkdownCallout({
  type,
  title,
  children,
  className = '',
  locale = 'th',
}: MarkdownCalloutProps) {
  const { icon, accent } = calloutStyles[type];
  const Tag = type === 'quote' ? 'blockquote' : 'aside';

  if (type === 'quote') {
    return (
      <Tag
        className={`markdown-callout my-10 border-l-2 border-plum/50 pl-6 sm:pl-8 py-2 font-serif text-[1.125rem] italic leading-relaxed text-text-soft relative ${className}`}
      >
        <SoulIcon
          name="quote"
          className="absolute -left-6 -top-4 opacity-10 text-plum hidden sm:block"
          size={56}
        />
        <div className="markdown-callout__content">{children}</div>
      </Tag>
    );
  }

  if (type === 'definition') {
    return (
      <aside
        className={`markdown-callout my-8 rounded-xl border border-celadon/25 bg-surface p-6 shadow-sm ${className}`}
      >
        <div className="flex items-center gap-2 mb-3 text-celadon">
          <SoulIcon name="definition" size={16} />
          <span className="text-xs font-semibold uppercase tracking-wider font-sans">
            {title || (locale === 'th' ? 'คำนิยาม / ความหมายศัพท์' : 'Definition')}
          </span>
        </div>
        <div className="markdown-callout__content text-text-soft font-serif">
          {children}
        </div>
      </aside>
    );
  }

  return (
    <Tag
      className={`markdown-callout my-8 rounded-lg border p-5 sm:p-6 ${accent} ${className}`}
    >
      <div className="flex items-start gap-4">
        <span className="grid size-9 shrink-0 place-items-center rounded-md border border-current/30">
          <SoulIcon name={icon} size={18} />
        </span>
        <div className="min-w-0 flex-1">
          {title ? (
            <p className="mb-2 font-sans text-sm font-semibold text-current">
              {title}
            </p>
          ) : null}
          <div className="markdown-callout__content text-text-soft">
            {children}
          </div>
        </div>
      </div>
    </Tag>
  );
}
