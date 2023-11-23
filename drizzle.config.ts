import type { Config } from 'drizzle-kit';

const drizzleConfig = {
	schema: './src/db/schema.ts',
	driver: 'turso',
	dbCredentials: {
		url: process.env.DATABASE_URL,
		authToken: process.env.DATABASE_AUTH_TOKEN,
	},
	verbose: true,
	strict: true,
	out: './drizzle',
} satisfies Config;

export default drizzleConfig;
