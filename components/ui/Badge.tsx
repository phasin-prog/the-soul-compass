import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'accent';
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  className = '',
}: BadgeProps) {
  const variants = {
    default: 'border-border bg-surface-raised text-muted',
    accent: 'border-accent/35 bg-accent-soft text-accent',
  };

  return (
    <span
      className={`
        inline-flex items-center rounded-full border px-3 py-1 text-sm
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
