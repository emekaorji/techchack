export interface IUserStack {
	id: string;
	score: number;
}

export interface IUser {
	id: string;
	name: string;
	email: string;
	image: string;
}

export interface IPublicUser extends IUser {
	role: string;
	stacks: IUserStack[];
}
