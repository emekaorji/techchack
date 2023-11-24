import type { Config } from 'drizzle-kit';

const drizzleConfig = {
	schema: './src/db/schema.ts',
	driver: 'turso',
	dbCredentials: {
		url: process.env.DATABASE_URL_PROD,
		authToken: process.env.DATABASE_AUTH_TOKEN_PROD,
	},
	verbose: true,
	strict: true,
	out: './migrations',
} satisfies Config;

export default drizzleConfig;
