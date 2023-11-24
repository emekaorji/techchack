import { drizzle } from 'drizzle-orm/libsql';
import { client } from './client';
import * as schema from './schema';

export const techChackDB = drizzle(client, { schema, logger: false });
