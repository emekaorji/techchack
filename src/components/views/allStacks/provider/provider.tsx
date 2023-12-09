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
import { useRouter } from 'next/router';

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
	const router = useRouter();

	const abortController = useRef(new AbortController());

	const [isLoading, setIsLoading] = useState(false);
	const [stacks, setStacks] = useState(allStacksResult?.results || []);
	const [pagination, setPagination] = useState(
		allStacksResult?.pagination || null
	);
	const [searchValue, setSearchValue] = useState(
		router.query.search?.toString() || ''
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
		const query = router.query as { [key: string]: string };
		fetchStacks(query.perPage, query.order, query.page, query.search);
	}, [fetchStacks, router.query]);

	const handleSearchInputChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const _value = event.target.value;
			setSearchValue(_value);
			if (_value === '') {
				const query = router.query as { [key: string]: string };
				if (_value === query.search) return;

				setIsLoading(true);
				router
					.push({ query: { ...query, search: _value } }, undefined, {
						scroll: true,
					})
					.catch(() => {
						setIsLoading(false);
					});
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[router.push, router.query]
	);
	const handleSearchSubmit = useCallback(
		(event: FormEvent) => {
			event.preventDefault();
			const query = router.query as { [key: string]: string };
			if (searchValue === query.search) return;

			setIsLoading(true);
			router
				.push({ query: { ...query, search: searchValue } }, undefined, {
					scroll: true,
				})
				.catch(() => {
					setIsLoading(false);
				});
		},
		[router, searchValue]
	);

	const handlePageChange = useCallback<
		AllStacksContextValue['handlePageChange']
	>(
		({ selected }) => {
			const _selected = selected + 1;
			if (_selected === pagination?.pageNumber) return;

			const query = router.query as { [key: string]: string };

			setIsLoading(true);
			router
				.push({ query: { ...query, page: _selected } }, undefined, {
					scroll: true,
				})
				.catch(() => {
					setIsLoading(false);
				});
		},
		[pagination?.pageNumber, router]
	);

	const goToPage = useCallback(
		(pageNumber: number) => {
			if (pageNumber === pagination?.pageNumber) return;

			const query = router.query as { [key: string]: string };

			setIsLoading(true);
			router
				.push({ query: { ...query, page: pageNumber } }, undefined, {
					scroll: true,
				})
				.catch(() => {
					setIsLoading(false);
				});
		},
		[pagination?.pageNumber, router]
	);

	const providerValue = useMemo<AllStacksContextValue>(
		() => ({
			goToPage,
			handlePageChange,
			handleSearchInputChange,
			handleSearchSubmit,
			isLoading,
			pagination,
			searchValue,
			stacks,
		}),
		[
			goToPage,
			handlePageChange,
			handleSearchInputChange,
			handleSearchSubmit,
			isLoading,
			pagination,
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
