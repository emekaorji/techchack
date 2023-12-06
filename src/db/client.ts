import { variables } from '@/constants/variables';
import { createClient } from '@libsql/client';

export const client = createClient({
	url: variables.DATABASE_URL,
	authToken: variables.DATABASE_AUTH_TOKEN,
});
