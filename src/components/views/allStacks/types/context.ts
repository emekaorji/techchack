import { IPagination, IStack } from '@/types/stack';
import { ChangeEventHandler, FormEventHandler } from 'react';

export interface AllStacksContextValue {
	goToPage: (pageNumber: number) => void;
	handlePageChange: ({ selected }: { selected: number }) => void;
	handleSearchInputChange: ChangeEventHandler<HTMLInputElement>;
	handleSearchSubmit: FormEventHandler;
	isLoading: boolean;
	pagination: IPagination | null;
	searchValue: string;
	stacks: IStack[];
}
