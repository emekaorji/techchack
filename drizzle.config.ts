import { variables } from '@/constants/variables';
import type { Config } from 'drizzle-kit';

const drizzleConfig = {
	schema: './src/db/schema.ts',
	driver: 'turso',
	dbCredentials: {
		url: variables.DATABASE_URL,
		authToken: variables.DATABASE_AUTH_TOKEN,
	},
	verbose: true,
	strict: true,
	out: './migrations',
} satisfies Config;

export default drizzleConfig;
