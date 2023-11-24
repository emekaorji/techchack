import { IPublicUser } from './api/user';
import { Dispatch, SetStateAction } from 'react';

export interface AuthContextValue {
	user: IPublicUser | null;
	setUser: Dispatch<SetStateAction<IPublicUser | null>>;
}
