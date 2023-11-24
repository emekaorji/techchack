import NextAuth, { DefaultSession } from 'next-auth';
import { IUserStack } from './api/user';

declare module 'next-auth' {
	interface Session {
		user: {
			id: string;
			role: string;
			stacks: IUserStack[];
			name: string;
			email: string;
			image: string;
		};
	}
}
