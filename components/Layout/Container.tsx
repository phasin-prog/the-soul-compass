import { ReactNode } from 'react';

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`max-w-soul-container mx-auto px-6 md:px-12 ${className}`}>
      {children}
    </div>
  );
}

export default Container;
