/**
 * Environment variable validation using Zod
 * Ensures all required environment variables are present and valid
 */

import { z } from 'zod';

const envSchema = z.object({
  // Site Configuration
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  
  // Supabase Configuration
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
  
  // Clerk Authentication
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  CLERK_SECRET_KEY: z.string().min(1),
  
  // Optional Analytics
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  NEXT_PUBLIC_PLAUSIBLE_DOMAIN: z.string().optional(),
});

type Env = z.infer<typeof envSchema>;

let validatedEnv: Env | undefined;

export function validateEnv(): Env {
  if (validatedEnv) {
    return validatedEnv;
  }

  const result = envSchema.safeParse(process.env);
  
  if (!result.success) {
    const errors = result.error.errors.map(err => 
      `${err.path.join('.')}: ${err.message}`
    );
    throw new Error(
      `Invalid environment variables:\n${errors.join('\n')}\n\n` +
      `Please check your .env.local file against env.example`
    );
  }

  validatedEnv = result.data;
  return validatedEnv;
}

// Export validated environment variables
export const env = validateEnv();
