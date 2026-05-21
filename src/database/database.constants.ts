import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import type * as schema from './schema';

export const DRIZZLE = Symbol('DRIZZLE_CLIENT');
export type DrizzleDB = NodePgDatabase<typeof schema>;
