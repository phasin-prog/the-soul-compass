import { ReactNode } from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  children,
  href,
  variant = 'primary',
  className = '',
  onClick,
  type = 'button',
}: ButtonProps) {
  const variants = {
    primary:
      'border-accent bg-accent text-accent-ink hover:border-accent-strong hover:bg-accent-strong',
    secondary:
      'border-border-strong bg-surface text-text hover:border-accent hover:bg-surface-raised',
    ghost:
      'border-transparent bg-transparent text-text-soft hover:bg-surface hover:text-accent',
    danger:
      'border-red-800/50 bg-red-950/30 text-red-300 hover:border-red-700/60 hover:bg-red-900/40',
  };

  const baseClasses = `
    inline-flex items-center justify-center
    min-h-11 rounded-md px-5 py-2.5
    text-sm font-semibold
    border transition-[background-color,color,border-color,transform] duration-200 ease-out
    active:translate-y-px
    ${variants[variant]}
    ${className}
  `;

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={baseClasses}>
      {children}
    </button>
  );
}
