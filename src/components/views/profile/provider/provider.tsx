import {
	ChangeEvent,
	ReactNode,
	createContext,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { ProfileContextValue } from '../types/context';
import { AllStacksResult, IMergedStack } from '@/types/stack';
import { IStack } from '@/types/stack';
import Fuse, { IFuseOptions } from 'fuse.js';
import useAuthContext from '@/hooks/context/useAuthContext';
import { IUserStack } from '@/types/user';
import complementArray from '@/utils/complementArray';

interface ProfileProviderProps {
	children: ReactNode;
	mergedStacks: IMergedStack[];
}

const ProfileContext = createContext<ProfileContextValue | null>(null);

const options: IFuseOptions<IStack> = {
	includeScore: true,
	threshold: 0.4,
	keys: ['name', 'description', 'category'],
};

const ProfileProvider = ({
	children,
	mergedStacks: _mergedStacks,
}: ProfileProviderProps) => {
	const { user, setUser } = useAuthContext();

	const pageNumber = useRef(0);
	const stash = useRef<IStack[]>([]);
	const fuse = useRef(new Fuse<IStack>([], options));
	const abortController = useRef(new AbortController());

	const [mergedStacks, setMergedStacks] = useState(_mergedStacks);
	const [isLoading, setIsLoading] = useState(false);
	const [isSearching, setIsSearching] = useState(false);
	const [searchValue, setValue] = useState('');
	const [stacks, setStacks] = useState<IStack[]>([]);
	const isLastPage = useRef(false);

	const parsedStacks = useMemo(() => {
		if (searchValue) {
			const fuseResult = fuse.current.search(searchValue);
			const result = fuseResult.map((i) => i.item);
			return complementArray(result, user?.stacks || [], 'id');
		} else {
			return complementArray(stacks, user?.stacks || [], 'id');
		}
	}, [searchValue, user?.stacks, stacks]);

	const handleSearchInputChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const _value = event.target.value;
			setValue(_value);
			pageNumber.current = 0;
			isLastPage.current = false;
		},
		[]
	);

	const updateStacks = useCallback((newStacks: IStack[]) => {
		setStacks((prev) => {
			const filteredStacks = newStacks.filter(
				(stack) => !prev.some((stack2) => stack2.id === stack.id)
			);
			return [...prev, ...filteredStacks];
		});
	}, []);

	const updateStash = useCallback((newStacks: IStack[]) => {
		const filteredStacks = newStacks.filter(
			(stack) => !stash.current.some((stack2) => stack2.id === stack.id)
		);
		stash.current = [...stash.current, ...filteredStacks];
	}, []);

	const fetchStacks = useCallback(async () => {
		return;
		abortController.current.abort(
			'Aborting search call because the search input changed'
		);
		abortController.current = new AbortController();
		try {
			setIsLoading(true);
			if (searchValue) setIsSearching(true);
			const response = await fetch(
				`/api/stacks?page=${pageNumber.current + 1}&search=${searchValue}`,
				{ signal: abortController.current.signal }
			);
			const results = (await response.json()) as AllStacksResult;
			// console.log('results', results);
			updateStacks(results.results);
			updateStash(results.results);
			isLastPage.current =
				results.pagination.pageNumber === results.pagination.pageCount;
			pageNumber.current = results.pagination.pageNumber;
			fuse.current.setCollection(stash.current);
		} catch (error: any) {
			console.log(error);
			throw Error(error.message);
		}
		setIsLoading(false);
		setIsSearching(false);
	}, [searchValue, updateStacks, updateStash]);

	// Infinite scroll implementation BEGINS
	const observerTarget = useRef<HTMLBRElement | null>(null);

	const handleIntersection = useCallback(() => {
		/**
		 * Wait for the stacks to render, then check if the observer target is
		 * still in viewport
		 */
		return new Promise<void>((resolve, reject) => {
			setTimeout(async () => {
				if (!observerTarget.current) return;
				const windowHeight = document.documentElement.clientHeight;
				const top = observerTarget.current.getBoundingClientRect().top;
				const isInView = windowHeight - top > 0;
				/**
				 * If the observer target is still in viewport then fetch more stacks
				 * and rerun this function
				 */
				if (isInView && !isLastPage.current && !isLoading) {
					try {
						await fetchStacks();
						resolve();
						handleIntersection();
					} catch (error: any) {
						reject(error.message);
					}
				} else {
					/**
					 * If the observer target is not in viewport anymore, then resolve and
					 * exit
					 */
					resolve();
				}
			}, 0);
		});
	}, [fetchStacks, isLoading]);

	useEffect(() => {
		const _observerTarget = observerTarget.current;
		const observer = new IntersectionObserver(handleIntersection, {
			threshold: 1,
		});

		if (_observerTarget) {
			observer.observe(_observerTarget);
		}

		return () => {
			if (_observerTarget) {
				observer.unobserve(_observerTarget);
			}
		};
	}, [handleIntersection]);
	// Infinite scroll implementation ENDS

	const addStack = useCallback(
		async (id: string) => {
			if (!user) throw Error('User is not logged in');
			if (!id) throw Error('`ID` is required as params');

			const response = await fetch(`/api/users/${user?.id}/stacks`, {
				body: JSON.stringify({ id }),
				headers: { 'Content-Type': 'application/json' },
				method: 'POST',
			});
			const result = (await response.json()) as IUserStack[];
			if (!response.ok) throw result;

			setUser((prev) => {
				if (prev) {
					prev.stacks = result;
					return { ...prev };
				}
				return prev;
			});

			const localStack = stash.current.find((stack) => stack.id === id);
			if (localStack) {
				const score = result.find((stack) => stack.id === id)?.score || 1;
				setMergedStacks((prev) => {
					prev.push({ ...localStack, score });
					return [...prev];
				});
			}
		},
		[setUser, user]
	);

	const deleteStack = useCallback(
		async (id: string) => {
			if (!user) throw Error('User is not logged in');
			if (!id) throw Error('`ID` is required as params');

			const response = await fetch(`/api/users/${user?.id}/stacks/${id}`, {
				method: 'DELETE',
			});
			const result = (await response.json()) as IUserStack[];
			setUser((prev) => {
				if (prev) {
					prev.stacks = result;
					return { ...prev };
				}
				return prev;
			});
			setMergedStacks((prev) => {
				const stackIndex = prev.findIndex((stack) => stack.id === id);
				if (stackIndex >= 0) prev.splice(stackIndex, 1);
				return [...prev];
			});
		},
		[setUser, user]
	);

	const providerValue = useMemo<ProfileContextValue>(
		() => ({
			addStack,
			deleteStack,
			handleSearchInputChange,
			isLoading,
			isSearching,
			observerTarget,
			searchValue,
			stacks: parsedStacks,
			mergedStacks,
		}),
		[
			addStack,
			deleteStack,
			handleSearchInputChange,
			isLoading,
			isSearching,
			parsedStacks,
			searchValue,
			mergedStacks,
		]
	);

	return (
		<ProfileContext.Provider value={providerValue}>
			{children}
		</ProfileContext.Provider>
	);
};

export { ProfileContext };
export default ProfileProvider;
