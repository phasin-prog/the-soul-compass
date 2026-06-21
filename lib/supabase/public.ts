import 'server-only';

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | undefined;

function required(name: string, fallbackName?: string): string {
  const value =
    process.env[name] || (fallbackName ? process.env[fallbackName] : undefined);

  if (!value) {
    const suffix = fallbackName ? ` or ${fallbackName}` : '';
    throw new Error(`Missing required environment variable: ${name}${suffix}`);
  }

  return value;
}

export function getSupabasePublic(): SupabaseClient {
  if (!client) {
    client = createClient(
      required('NEXT_PUBLIC_SUPABASE_URL'),
      required(
        'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY',
        'NEXT_PUBLIC_SUPABASE_ANON_KEY'
      ),
      {
        auth: {
          autoRefreshToken: false,
          detectSessionInUrl: false,
          persistSession: false,
        },
      }
    );
  }

  return client;
}
