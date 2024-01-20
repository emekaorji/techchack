import NextAuth, { NextAuthOptions, Session } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { techChackDB } from '@/db';
import { users } from '@/db/schema';
import { variables } from '@/constants/variables';
import { eq } from 'drizzle-orm';
import { IUser } from '@/types/user';

const credentials = {
	githubClientId: variables.GITHUB_CLIENT_ID,
	githubClientSecret: variables.GITHUB_CLIENT_SECRET,
};

export const nextAuthOptions: NextAuthOptions = {
	adapter: {
		...DrizzleAdapter(techChackDB),
		async createUser(data) {
			const userId = crypto.randomUUID();
			const user = {
				...data,
				id: userId,
				roles: [],
				stacks: [],
				company: '',
				description: '',
				githubUrl: '',
				interests: '',
				joinedDate: new Date().getTime(),
				linkedinUrl: '',
				location: '',
				phone: '',
				pronouns: '',
				publicFields: [],
				twitterUrl: '',
			} satisfies Omit<IUser, 'name' | 'email' | 'image' | 'emailVerified'>;
			const res = await techChackDB
				.insert(users)
				.values(user)
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
			let parsedUser: Session['user'] = {
				company: '',
				description: '',
				email: '',
				githubUrl: '',
				id: '',
				image: '',
				interests: '',
				joinedDate: null,
				linkedinUrl: '',
				location: '',
				name: '',
				phone: '',
				pronouns: '',
				publicFields: [],
				roles: [],
				stacks: [],
				twitterUrl: '',
			};
			if (session?.user && user) {
				const userId = user.id;
				try {
					const _user = await techChackDB
						.select()
						.from(users)
						.where(eq(users.id, userId))
						.get();
					console.log(_user);
					console.log(_user?.joinedDate);
					console.log(typeof _user?.joinedDate);
					parsedUser = {
						company: _user?.company || '',
						description: _user?.description || '',
						email: _user?.email || '',
						githubUrl: _user?.githubUrl || '',
						id: _user?.id || '',
						image: _user?.image || '',
						interests: _user?.interests || '',
						joinedDate: _user?.joinedDate || null,
						linkedinUrl: _user?.linkedinUrl || '',
						location: _user?.location || '',
						name: _user?.name || '',
						phone: _user?.phone || '',
						pronouns: _user?.pronouns || '',
						publicFields: _user?.publicFields || [],
						roles: _user?.roles || [],
						stacks: _user?.stacks || [],
						twitterUrl: _user?.twitterUrl || '',
					};
				} catch (error) {
					console.error('There was an error in fetching the user info', error);
				}
				session.user = parsedUser;
			} else {
				session.user = null;
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
