import { ModalOptions } from './modal';
import { IPublicUser } from './user';
import { Dispatch, ReactNode, SetStateAction } from 'react';

export interface AuthContextValue {
	user: IPublicUser | null;
	setUser: Dispatch<SetStateAction<IPublicUser | null>>;
}

export interface ModalContextValue {
	createModal: (content: ReactNode, options: ModalOptions) => void;
}
