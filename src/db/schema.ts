import {
	integer,
	sqliteTable,
	text,
	primaryKey,
	blob,
} from 'drizzle-orm/sqlite-core';
import type { AdapterAccount } from '@auth/core/adapters';

export const users = sqliteTable('user', {
	id: text('id').notNull().primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull(),
	emailVerified: integer('emailVerified', { mode: 'timestamp_ms' }),
	image: text('image').notNull().default(''),
	role: text('role').notNull().default(''),
	stacks: blob('stacks', { mode: 'json' })
		.notNull()
		.$type<{ id: string; score: number }[]>()
		.default([]),
});

export const accounts = sqliteTable(
	'account',
	{
		userId: text('userId')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		type: text('type').$type<AdapterAccount['type']>().notNull(),
		provider: text('provider').notNull(),
		providerAccountId: text('providerAccountId').notNull(),
		refresh_token: text('refresh_token'),
		access_token: text('access_token'),
		expires_at: integer('expires_at'),
		token_type: text('token_type'),
		scope: text('scope'),
		id_token: text('id_token'),
		session_state: text('session_state'),
	},
	(account) => ({
		compoundKey: primaryKey({
			columns: [account.provider, account.providerAccountId],
		}),
	})
);

export const sessions = sqliteTable('session', {
	sessionToken: text('sessionToken').notNull().primaryKey(),
	userId: text('userId')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expires: integer('expires', { mode: 'timestamp_ms' }).notNull(),
});

export const verificationTokens = sqliteTable(
	'verificationToken',
	{
		identifier: text('identifier').notNull(),
		token: text('token').notNull(),
		expires: integer('expires', { mode: 'timestamp_ms' }).notNull(),
	},
	(vt) => ({
		compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
	})
);

export const stacks = sqliteTable('stack', {
	id: text('id').notNull().primaryKey(),
	name: text('name').notNull(),
	description: text('description').notNull().default(''),
	category: text('category', {
		enum: [
			'Languages',
			'Libraries & Frameworks',
			'Tools & Services',
			'Environments',
			'Concepts & Fields',
		],
	}),
	link: text('link').notNull(),
	requirements: text('requirements', { mode: 'json' })
		.notNull()
		.$type<string[]>()
		.default([]),
	icon: text('icon').notNull().default(''),
});
