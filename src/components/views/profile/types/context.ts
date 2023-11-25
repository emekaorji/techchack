import { IStack } from '@/types/stack';
import { ChangeEventHandler, MutableRefObject } from 'react';

export interface ProfileContextValue {
	addStack: (id: string) => Promise<void>;
	deleteStack: (id: string) => Promise<void>;
	handleSearchInputChange: ChangeEventHandler<HTMLInputElement>;
	isLoading: boolean;
	isSearching: boolean;
	observerTarget: MutableRefObject<HTMLBRElement | null>;
	searchValue: string;
	stacks: IStack[];
	userStacks: IStack[];
}
