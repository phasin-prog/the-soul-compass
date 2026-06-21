import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={`
        rounded-xl border border-border bg-surface p-6
        ${hover ? 'transition-[transform,border-color,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface-raised' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
