import { SoulIcon, type SoulIconName } from './SoulIcon';

interface SectionHeadingProps {
  icon: SoulIconName;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  level?: 'h2' | 'h3';
  id?: string;
  className?: string;
}

export function SectionHeading({
  icon,
  title,
  subtitle,
  eyebrow,
  level = 'h2',
  id,
  className = '',
}: SectionHeadingProps) {
  const Heading = level;

  return (
    <div className={`flex items-start gap-4 ${className}`}>
      <span className="grid size-11 shrink-0 place-items-center rounded-md border border-accent/35 bg-accent-soft text-accent">
        <SoulIcon name={icon} size={20} />
      </span>
      <div className="min-w-0">
        {eyebrow ? (
          <p className="mb-1 text-sm leading-6 text-muted">{eyebrow}</p>
        ) : null}
        <Heading id={id} className="type-section-title text-text">
          {title}
        </Heading>
        {subtitle ? (
          <p className="mt-2 max-w-2xl text-base leading-7 text-text-soft">
            {subtitle}
          </p>
        ) : null}
      </div>
    </div>
  );
}
