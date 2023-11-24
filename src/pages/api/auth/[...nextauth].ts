import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { techChackDB } from '@/db';
import { publicUsers } from '@/db/schema';
import { eq } from 'drizzle-orm';

const devCredentials = {
	githubClientId: process.env.DEV_GITHUB_CLIENT_ID,
	githubClientSecret: process.env.DEV_GITHUB_CLIENT_SECRET,
};
const stagingCredentials = {
	githubClientId: process.env.STAG_GITHUB_CLIENT_ID,
	githubClientSecret: process.env.STAG_GITHUB_CLIENT_SECRET,
};
const credentials =
	process.env.NODE_ENV === 'development' ? devCredentials : stagingCredentials;

export const nextAuthOptions: NextAuthOptions = {
	adapter: DrizzleAdapter(techChackDB),
	providers: [
		GithubProvider({
			clientId: credentials.githubClientId,
			clientSecret: credentials.githubClientSecret,
			allowDangerousEmailAccountLinking: true,
		}),
	],
	callbacks: {
		session: async ({ session, user }) => {
			if (session?.user) {
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
				}
				session.user.id = userId;
				session.user.name = user.name || '';
				session.user.email = user.email || '';
				session.user.image = user.image || '';
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
