import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';

const client = createClient({
	url: process.env.DATABASE_URL_PROD,
	authToken: process.env.DATABASE_AUTH_TOKEN_PROD,
});

export const techChackDB = drizzle(client, { schema, logger: false });
