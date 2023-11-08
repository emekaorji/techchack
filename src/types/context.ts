interface IUser {
	name?: string | null | undefined;
	email?: string | null | undefined;
	image?: string | null | undefined;
}
export interface AuthContextValue {
	user: IUser | null;
}
