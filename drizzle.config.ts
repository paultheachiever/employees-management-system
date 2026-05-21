import { config as loadEnv } from 'dotenv';
import { join } from 'path';
import { defineConfig } from 'drizzle-kit';

const NODE_ENV = process.env.NODE_ENV ?? 'development';
loadEnv({ path: join(__dirname, `.env.${NODE_ENV}.local`), override: false });
loadEnv({ path: join(__dirname, `.env.${NODE_ENV}`), override: false });

const url = process.env.DATABASE_URL;
if (!url) throw new Error('DATABASE_URL is not set');

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/database/schema.ts',
  out: './src/database/migrations',
  dbCredentials: { url },
  strict: true,
  verbose: true,
});
