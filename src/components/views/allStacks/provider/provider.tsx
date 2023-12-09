import {
	ChangeEvent,
	FormEvent,
	ReactNode,
	createContext,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { AllStacksContextValue } from '../types/context';
import { AllStacksResult } from '@/types/stack';
import { NextRouter, useRouter } from 'next/router';

interface AllStacksProviderProps {
	children: ReactNode;
	allStacksResult?: AllStacksResult;
}

// interface Query {
// 	perPage: number;
// 	order: 'asc' | 'desc';
// 	page: number;
// 	search: string;
// }

const AllStacksContext = createContext<AllStacksContextValue | null>(null);

const AllStacksProvider = ({
	children,
	allStacksResult,
}: AllStacksProviderProps) => {
	const { push, query } = useRouter() as NextRouter & {
		query: { [key: string]: string };
	};

	const abortController = useRef(new AbortController());

	const [isLoading, setIsLoading] = useState(false);
	const [stacks, setStacks] = useState(allStacksResult?.results || []);
	const [pagination, setPagination] = useState(
		allStacksResult?.pagination || null
	);
	const [searchValue, setSearchValue] = useState(
		query.search?.toString() || ''
	);
	const [perPageValue, setPerPageValue] = useState(
		query.perPage?.toString() || '20'
	);
	const [orderValue, setOrderValue] = useState(
		query.order?.toString() || 'asc'
	);

	const fetchStacks = useCallback(
		async (
			perPage: string | number = 20,
			order = 'asc',
			page: string | number = 1,
			search = ''
		) => {
			abortController.current.abort(
				'Aborting search call because the search input changed'
			);
			abortController.current = new AbortController();
			try {
				setIsLoading(true);
				const response = await fetch(
					`/api/stacks?page=${page}&search=${search}&perPage=${perPage}&order=${order}`,
					{ signal: abortController.current.signal }
				);
				const results = (await response.json()) as AllStacksResult;
				setStacks(results.results);
				setPagination(results.pagination);
			} catch (error: any) {
				console.log(error);
			}
			setIsLoading(false);
		},
		[]
	);

	useEffect(() => {
		fetchStacks(query.perPage, query.order, query.page, query.search);
	}, [fetchStacks, push, query]);

	const handleSearchInputChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const _value = event.target.value;
			setSearchValue(_value);
			if (_value === '') {
				if (_value === query.search) return;

				setIsLoading(true);
				push({ query: { ...query, search: _value } }, undefined, {
					scroll: true,
				}).catch(() => {
					setIsLoading(false);
				});
			}
		},
		[push, query]
	);

	const handleSearchSubmit = useCallback(
		(event: FormEvent) => {
			event.preventDefault();
			if (searchValue === query.search) return;

			setIsLoading(true);
			push({ query: { ...query, page: 1, search: searchValue } }, undefined, {
				scroll: true,
			}).catch(() => {
				setIsLoading(false);
			});
		},
		[push, query, searchValue]
	);

	const handlePerPageChange = useCallback(
		(event: ChangeEvent<HTMLSelectElement>) => {
			const _value = event.target.value;
			setPerPageValue(_value);

			setIsLoading(true);
			push({ query: { ...query, page: 1, perPage: _value } }, undefined, {
				scroll: true,
			}).catch(() => {
				setIsLoading(false);
			});
		},
		[push, query]
	);

	const handleOrderChange = useCallback(
		(event: ChangeEvent<HTMLSelectElement>) => {
			const _value = event.target.value;
			setOrderValue(_value);

			setIsLoading(true);
			push({ query: { ...query, order: _value } }, undefined, {
				scroll: true,
			}).catch(() => {
				setIsLoading(false);
			});
		},
		[push, query]
	);

	const handlePageChange = useCallback<
		AllStacksContextValue['handlePageChange']
	>(
		({ selected }) => {
			const _selected = selected + 1;
			if (_selected === pagination?.pageNumber) return;

			setIsLoading(true);
			push({ query: { ...query, page: _selected } }, undefined, {
				scroll: true,
			}).catch(() => {
				setIsLoading(false);
			});
		},
		[pagination?.pageNumber, push, query]
	);

	const goToPage = useCallback(
		(pageNumber: number) => {
			if (pageNumber === pagination?.pageNumber) return;

			setIsLoading(true);
			push({ query: { ...query, page: pageNumber } }, undefined, {
				scroll: true,
			}).catch(() => {
				setIsLoading(false);
			});
		},
		[pagination?.pageNumber, push, query]
	);

	const providerValue = useMemo<AllStacksContextValue>(
		() => ({
			goToPage,
			handleOrderChange,
			handlePageChange,
			handlePerPageChange,
			handleSearchInputChange,
			handleSearchSubmit,
			isLoading,
			orderValue,
			pagination,
			perPageValue,
			searchValue,
			stacks,
		}),
		[
			goToPage,
			handleOrderChange,
			handlePageChange,
			handlePerPageChange,
			handleSearchInputChange,
			handleSearchSubmit,
			isLoading,
			orderValue,
			pagination,
			perPageValue,
			searchValue,
			stacks,
		]
	);

	return (
		<AllStacksContext.Provider value={providerValue}>
			{children}
		</AllStacksContext.Provider>
	);
};

export { AllStacksContext };
export default AllStacksProvider;
