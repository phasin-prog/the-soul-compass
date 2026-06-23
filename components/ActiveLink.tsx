'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ComponentProps } from 'react';

interface ActiveLinkProps extends ComponentProps<typeof Link> {
  activeClassName: string;
  exact?: boolean;
}

export function ActiveLink({
  activeClassName,
  className = '',
  exact = false,
  href,
  ...props
}: ActiveLinkProps) {
  const pathname = usePathname();
  const path = typeof href === 'string' ? href : href.pathname ?? '';
  const active = exact
    ? pathname === path
    : pathname === path || pathname.startsWith(`${path}/`);

  return (
    <Link
      {...props}
      href={href}
      aria-current={active ? 'page' : undefined}
      className={`${className} ${active ? activeClassName : ''}`}
    />
  );
}
