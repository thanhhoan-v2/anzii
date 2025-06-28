import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set. Please create a .env file and add your Neon database connection string.');
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql, { schema });
