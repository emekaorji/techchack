import { migrate } from 'drizzle-orm/libsql/migrator';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

async function main() {
	const client = createClient({
		url: process.env.PROD_DATABASE_URL,
		authToken: process.env.PROD_DATABASE_AUTH_TOKEN,
	});

	const db = drizzle(client);

	console.log('Running migrations');

	await migrate(db, { migrationsFolder: 'migrations' });

	console.log('Migrated successfully');

	process.exit(0);
}

main().catch((e) => {
	console.error('Migration failed');
	console.error(e.message);
	process.exit(1);
});
