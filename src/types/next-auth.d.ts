import NextAuth, { DefaultSession } from 'next-auth';
import { IUserStack } from './user';

declare module 'next-auth' {
	interface Session {
		user: {
			id: string;
			roles: string[];
			stacks: IUserStack[];
			name: string;
			email: string;
			image: string;
			description: string;
			twitterUrl: string;
			linkedinUrl: string;
			githubUrl: string;
			company: string;
			location: string;
			joinedDate: number | null;
			phone: string;
			interests: string;
			pronouns: string;
			publicFields: string[];
		} | null;
	}
}
