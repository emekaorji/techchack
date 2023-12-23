import { ModalOptions } from './modal';
import { IUser } from './user';
import { Dispatch, ReactNode, SetStateAction } from 'react';

export interface AuthContextValue {
	user: IUser | null;
	setUser: Dispatch<SetStateAction<IUser | null>>;
}

export interface ModalContextValue {
	createModal: (content: ReactNode, options: ModalOptions) => void;
}

export interface ViewContextValue {
	background: string;
	changeBackground: (background: string) => void;
}
