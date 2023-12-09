import { IMergedStack, IStack } from '@/types/stack';
import {
	ChangeEventHandler,
	Dispatch,
	MutableRefObject,
	SetStateAction,
} from 'react';

export interface ProfileContextValue {
	addStack: (id: string) => Promise<void>;
	deleteStack: (id: string) => Promise<void>;
	expandedStripId: string;
	handleSearchInputChange: ChangeEventHandler<HTMLInputElement>;
	isLoading: boolean;
	isSearching: boolean;
	mergedStacks: IMergedStack[];
	observerTarget: MutableRefObject<HTMLBRElement | null>;
	searchValue: string;
	setExpandedStripId: Dispatch<SetStateAction<string>>;
	stacks: IStack[];
}
