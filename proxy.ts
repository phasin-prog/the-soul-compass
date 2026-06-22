import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';
import { defaultLocale, locales } from './lib/site';

const localeSet = new Set(locales);

const protectedAreaProxy = clerkMiddleware(async (auth, request) => {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    const locale = request.nextUrl.pathname.split('/').filter(Boolean)[0];
    const signInUrl = new URL(`/${locale}/login`, request.url);
    signInUrl.searchParams.set(
      'redirect_url',
      `${request.nextUrl.pathname}${request.nextUrl.search}`
    );
    return NextResponse.redirect(signInUrl);
  }
});

async function runProtectedAreaProxy(
  request: NextRequest,
  event: NextFetchEvent
) {
  const response = await protectedAreaProxy(request, event);

  if (response instanceof Response) {
    const rewrite = response.headers.get('x-middleware-rewrite');

    if (rewrite) {
      const rewriteUrl = new URL(rewrite);
      const isSameRequest =
        rewriteUrl.origin === request.nextUrl.origin &&
        rewriteUrl.pathname === request.nextUrl.pathname &&
        rewriteUrl.search === request.nextUrl.search;

      if (isSameRequest) {
        response.headers.delete('x-middleware-rewrite');
        response.headers.set('x-middleware-next', '1');
      }
    }
  }

  return response;
}

export default async function proxy(
  request: NextRequest,
  event: NextFetchEvent
) {
  const pathname = request.nextUrl.pathname;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const pathnameSegments = pathname.split('/').filter(Boolean);
  const firstSegment = pathnameSegments[0];

  if (
    firstSegment &&
    localeSet.has(firstSegment as (typeof locales)[number])
  ) {
    if (pathnameSegments[1] === 'studio') {
      if (pathnameSegments.length === 2) {
        return NextResponse.redirect(
          new URL(`/${firstSegment}/studio/articles`, request.url)
        );
      }

      if (pathnameSegments.length === 3 && pathnameSegments[2] === 'new') {
        return NextResponse.redirect(
          new URL(`/${firstSegment}/studio/articles/new`, request.url)
        );
      }

      if (
        pathnameSegments.length === 3 &&
        pathnameSegments[2] !== 'articles'
      ) {
        return NextResponse.redirect(
          new URL(
            `/${firstSegment}/studio/articles/${pathnameSegments[2]}/edit`,
            request.url
          )
        );
      }

      return runProtectedAreaProxy(request, event);
    }

    if (
      pathnameSegments[1] === 'account' ||
      pathnameSegments[1] === 'admin'
    ) {
      return runProtectedAreaProxy(request, event);
    }

    return NextResponse.next();
  }

  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }

  const acceptLanguage = request.headers.get('accept-language');
  let detectedLocale = defaultLocale;

  if (acceptLanguage) {
    const languages = acceptLanguage
      .split(',')
      .map((lang) => lang.split(';')[0].trim().toLowerCase());

    for (const lang of languages) {
      if (lang.startsWith('th')) {
        detectedLocale = 'th';
        break;
      }
      if (lang.startsWith('en')) {
        detectedLocale = 'en';
        break;
      }
    }
  }

  return NextResponse.redirect(
    new URL(`/${detectedLocale}${pathname}`, request.url)
  );
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.webp).*)',
  ],
};
