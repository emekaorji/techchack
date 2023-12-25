export interface IUserStack {
	id: string;
	score: number;
	experience: number;
	proofs: string[];
}

export interface IUser {
	id: string;
	name: string;
	email: string;
	image: string;
	role: string;
	stacks: IUserStack[];
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
}
