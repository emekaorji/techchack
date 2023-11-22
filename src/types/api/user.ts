export interface IUserStack {
	id: string;
	score: number;
}

export interface IUser {
	id: string;
	name: string;
	email: string;
	emailVerified: Date | null;
	image: string;
	role: string;
	stacks: IUserStack[];
}
