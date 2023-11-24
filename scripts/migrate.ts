import { migrate } from 'drizzle-orm/libsql/migrator';
import { drizzle } from 'drizzle-orm/libsql';
import { client } from '@/db/client';

async function main() {
	const db = drizzle(client);

	console.log('Running migrations');

	await migrate(db, { migrationsFolder: 'drizzle' });

	console.log('Migrated successfully');

	process.exit(0);
}

main().catch((e) => {
	console.error('Migration failed');
	console.error(e.message);
	process.exit(1);
});
