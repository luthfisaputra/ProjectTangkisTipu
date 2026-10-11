import 'dotenv/config';
import { z } from 'zod';

const schema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL wajib diisi'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  CORS_ORIGIN: z.string().default('*'),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(60000),
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(100),
  RATE_LIMIT_TOKEN_FAIL_MAX: z.coerce.number().int().positive().default(10),
  TRUST_PROXY: z.coerce.number().int().min(0).default(0),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  const details = parsed.error.issues
    .map((i) => `${i.path.join('.')}: ${i.message}`)
    .join('; ');
  console.error(`[env] Konfigurasi tidak valid -> ${details}`);
  process.exit(1);
}

export const env = parsed.data;

if (env.NODE_ENV === 'production' && (!env.CORS_ORIGIN || env.CORS_ORIGIN === '*')) {
  console.error(
    '[env] CORS_ORIGIN masih "*" atau kosong saat NODE_ENV=production. ' +
      'Setel CORS_ORIGIN ke domain asli sebelum menjalankan server produksi.',
  );
  process.exit(1);
}
