import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { techChackDB } from '@/db';
import { accounts, publicUsers } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { variables } from '@/constants/variables';
import { AdapterAccount } from '@auth/core/adapters';

const credentials = {
	githubClientId: variables.GITHUB_CLIENT_ID,
	githubClientSecret: variables.GITHUB_CLIENT_SECRET,
};

export const nextAuthOptions: NextAuthOptions = {
	adapter: DrizzleAdapter(techChackDB),
	// adapter: {...DrizzleAdapter(techChackDB), linkAccount: (rawAccount) => {
	// 	const updatedAccount = await techChackDB
	// 			.insert(accounts)
	// 			.values(rawAccount)
	// 			.returning()
	// 			.get();

	// 		const account: AdapterAccount = {
	// 			...updatedAccount,
	// 			type: updatedAccount.type,
	// 			access_token: updatedAccount.access_token ?? undefined,
	// 			token_type: updatedAccount.token_type ?? undefined,
	// 			id_token: updatedAccount.id_token ?? undefined,
	// 			refresh_token: updatedAccount.refresh_token ?? undefined,
	// 			scope: updatedAccount.scope ?? undefined,
	// 			expires_at: updatedAccount.expires_at ?? undefined,
	// 			session_state: updatedAccount.session_state ?? undefined,
	// 		};

	// 		return account;
	// }},
	providers: [
		GithubProvider({
			clientId: credentials.githubClientId,
			clientSecret: credentials.githubClientSecret,
			allowDangerousEmailAccountLinking: true,
		}),
	],
	callbacks: {
		session: async ({ session, user }) => {
			if (session?.user && user) {
				const userId = user.id;
				try {
					const publicUser = await techChackDB
						.select()
						.from(publicUsers)
						.where(eq(publicUsers.id, userId))
						.get();
					session.user.role = publicUser?.role || '';
					session.user.stacks = publicUser?.stacks || [];
				} catch (error) {
					console.error('There was an error in fetching the public user info');
					session.user.role = '';
					session.user.stacks = [];
				}
				session.user.id = userId;
				session.user.name = user.name || '';
				session.user.email = user.email || '';
				session.user.image = user.image || '';
			} else {
				session.user.role = '';
				session.user.stacks = [];
			}
			return session;
		},
	},
	pages: {
		signIn: '/login',
		// error: 'OAuthCreateAccount'
	},
	secret: process.env.TECHCHACK_SECRET,
} satisfies NextAuthOptions;

export default NextAuth(nextAuthOptions);
