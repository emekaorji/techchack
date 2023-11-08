import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
// import { MongoDBAdapter } from '@auth/mongodb-adapter';
// import clientPromise from '@/db/mongodb';

const options: NextAuthOptions = {
	// adapter: MongoDBAdapter(clientPromise),
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
			allowDangerousEmailAccountLinking: true,
		}),
	],
} satisfies NextAuthOptions;

export default NextAuth(options);
