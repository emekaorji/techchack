import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { techChackDB } from '@/db';
import { users } from '@/db/schema';
import { variables } from '@/constants/variables';

const credentials = {
	githubClientId: variables.GITHUB_CLIENT_ID,
	githubClientSecret: variables.GITHUB_CLIENT_SECRET,
};

export const nextAuthOptions: NextAuthOptions = {
	adapter: {
		...DrizzleAdapter(techChackDB),
		async createUser(data) {
			const userId = crypto.randomUUID();
			const res = await techChackDB
				.insert(users)
				.values({ ...data, id: userId, role: null, stacks: null })
				.returning()
				.get();

			return res;
		},
	},
	providers: [
		GithubProvider({
			clientId: credentials.githubClientId,
			clientSecret: credentials.githubClientSecret,
			allowDangerousEmailAccountLinking: true,
		}),
	],
	callbacks: {
		session: async ({ session, user }) => {
			console.log(user);
			if (session?.user && user) {
				session.user.role = '';
				session.user.stacks = [];
				session.user.id = user.id;
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
