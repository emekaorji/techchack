import { IPagination, IStack } from '@/types/stack';
import { ChangeEventHandler, FormEventHandler } from 'react';

export interface AllStacksContextValue {
	goToPage: (pageNumber: number) => void;
	handleOrderChange: ChangeEventHandler<HTMLSelectElement>;
	handlePageChange: ({ selected }: { selected: number }) => void;
	handlePerPageChange: ChangeEventHandler<HTMLSelectElement>;
	handleSearchInputChange: ChangeEventHandler<HTMLInputElement>;
	handleSearchSubmit: FormEventHandler;
	isLoading: boolean;
	orderValue: string;
	pagination: IPagination | null;
	perPageValue: string;
	searchValue: string;
	stacks: IStack[];
}
