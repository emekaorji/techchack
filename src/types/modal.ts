import { MutableRefObject, ReactNode } from 'react';

export type Resolve<T> = (value?: T) => void;
export type Reject = (reason?: any) => void;
export type ActionElementRef = MutableRefObject<HTMLButtonElement | null>;
interface Params<T> {
	resolve: Resolve<T>;
	reject: Reject;
	actionElementRef: ActionElementRef;
}
export type ModalContent<T> = ReactNode | ((params: Params<T>) => ReactNode);

export interface ModalOptions {
	className?: string;
	x: number;
	y: number;
}
