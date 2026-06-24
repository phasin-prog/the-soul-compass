import type { NextConfig } from "next";

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
];

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '6mb',
    },
  },
  images: {
    remotePatterns: [
      ...(process.env.NEXT_PUBLIC_SUPABASE_URL
        ? [
            {
              protocol: 'https' as const,
              hostname: new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname,
              pathname: '/storage/v1/object/public/article-covers/**',
            },
          ]
        : []),
      {
        protocol: 'https' as const,
        hostname: 'pub-a6d858289a46ca560102ecd69a1bae4e.r2.dev',
        pathname: '/the-souls-compass/**',
      },
    ],
  },
  turbopack: {
    root: process.cwd(),
  },
  headers: async () => [
    { source: '/(.*)', headers: securityHeaders },
  ],
};

export default nextConfig;
