import { createClient } from '@libsql/client';

export const client = createClient({
	url: process.env.DATABASE_URL_PROD,
	authToken: process.env.DATABASE_AUTH_TOKEN_PROD,
});
