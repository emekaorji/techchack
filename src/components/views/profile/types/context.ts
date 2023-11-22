import { IStack } from '@/types/stack';
import { ChangeEvent, ChangeEventHandler, MutableRefObject } from 'react';

export interface ProfileContextValue {
	handleSearchInputChange: ChangeEventHandler<HTMLInputElement>;
	isLoading: boolean;
	isSearching: boolean;
	observerTarget: MutableRefObject<HTMLBRElement | null>;
	searchValue: string;
	stacks: IStack[];
}
