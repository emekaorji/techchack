import { ModalContent, ModalOptions } from './modal';
import { IPublicUser } from './user';
import { Dispatch, SetStateAction } from 'react';

export interface AuthContextValue {
	user: IPublicUser | null;
	setUser: Dispatch<SetStateAction<IPublicUser | null>>;
}

export interface ModalContextValue {
	createModal: <T = undefined>(
		content: ModalContent<T>,
		options?: ModalOptions
	) => Promise<T | undefined>;
}
