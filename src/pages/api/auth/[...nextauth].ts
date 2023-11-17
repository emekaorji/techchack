import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/db/mongodb';

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

const options: NextAuthOptions = {
	adapter: MongoDBAdapter(clientPromise, { databaseName: 'techchack' }),
	providers: [
		GithubProvider({
			clientId: credentials.githubClientId,
			clientSecret: credentials.githubClientSecret,
			allowDangerousEmailAccountLinking: true,
		}),
	],
	secret: process.env.TECHCHACK_SECRET,
} satisfies NextAuthOptions;

export default NextAuth(options);
