import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { techChackDB } from '@/db';

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
				session.user.id = user.id;
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
