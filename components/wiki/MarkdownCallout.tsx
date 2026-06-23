import type { ReactNode } from 'react';
import { SoulIcon, type SoulIconName } from '@/components/icons/SoulIcon';

export type MarkdownCalloutType =
  | 'concept'
  | 'definition'
  | 'source'
  | 'quote'
  | 'warning'
  | 'reflection'
  | 'question'
  | 'comparison';

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
};

interface MarkdownCalloutProps {
  type: MarkdownCalloutType;
  title?: string;
  children: ReactNode;
  className?: string;
}

export function MarkdownCallout({
  type,
  title,
  children,
  className = '',
}: MarkdownCalloutProps) {
  const { icon, accent } = calloutStyles[type];
  const Tag = type === 'quote' ? 'blockquote' : 'aside';

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
