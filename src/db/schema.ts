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
	name: text('name'),
	email: text('email').notNull(),
	emailVerified: integer('emailVerified', { mode: 'timestamp_ms' }),
	image: text('image'),
	role: text('role'),
	description: text('description'),
	twitterUrl: text('twitterUrl'),
	linkedinUrl: text('linkedinUrl'),
	githubUrl: text('githubUrl'),
	company: text('company'),
	location: text('location'),
	joinedDate: integer('joinedDate', { mode: 'timestamp_ms' }),
	phone: text('phone'),
	interests: text('interests'),
	pronouns: text('pronouns'),
	stacks: blob('stacks', { mode: 'json' }).$type<
		{ id: string; score: number; experience: number; proofs: string[] }[]
	>(),
	publicFields: text('publicFields', { mode: 'json' }).$type<string[]>(),
});

export const accounts = sqliteTable('account', {
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
});

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
	shortDescription: text('shortDescription'),
	description: text('description'),
	category: text('category', {
		enum: [
			'Languages',
			'Libraries & Frameworks',
			'Tools & Services',
			'Environments',
			'Concepts & Fields',
		],
	}),
	link: text('link'),
	requirements: text('requirements', { mode: 'json' }).$type<string[]>(),
	icon: text('icon'),
	releaseDate: integer('releaseDate', { mode: 'timestamp_ms' }),
	creators: text('creators', { mode: 'json' }).$type<string[]>(),
});
