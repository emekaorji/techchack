import Head from 'next/head';
import {
	ChangeEvent,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import SearchIcon from '@/components/interface/icons/search';
// import { signOut } from 'next-auth/react';
import Chip from '@/components/interface/chip/chip';
import Avatar from '@/components/interface/avatar/avatar';
import useAuthContext from '@/hooks/context/useAuthContext';
import styles from './profile.module.css';
import IconButton from '@/components/interface/buttons/iconButton/iconButton';
import PenIcon from '@/components/interface/icons/pen';
import { IStack } from '@/types/stack';
import LoaderIcon from '@/components/interface/icons/loader';
import { AllStacksResult } from '@/types/api/stack';

/**
 * Stack Object
 * 1. ID
 * 2. Name
 * 3. Category
 * 4. Description
 * 5. Requirements - an array of must haves to claim to have experience with the stack
 *
 * Example:
 * {
 * 	 "id": "",
 * 	 "name": "JavaScript",
 * 	 "category": "Language",
 * 	 "description": "JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS. As of 2023, 98.7% of websites use JavaScript on the client side for webpage behavior, often incorporating third-party libraries.",
 * 	 "requirements": ["Syntax", "Functions", "Object and Array Methods", "DOM Manipulation", "Event Handling", "Async/Await", "Closures and Scopes", "Testing", "ES6", "AJAX and Fetch"],
 * }
 *
 * Categories of stack
 * 1. Languages - PHP, JavaScript, R, HTML, EJS, TypeScript, Rust, Go
 * 2. Libraries & Frameworks - React, NextJS, Laravel, AngularJS, D3.js
 * 3. Tools & Services - Amazon ECS, DatadogHQ, Netlify
 * 4. Environments - VSCode, JetBrains, Atom, Remix, StackBlitz, Visual Studio
 * 5. Concepts & Fields - Microservices, DevOps, Virtualization, Memoization
 */
const Profile = () => {
	const { user } = useAuthContext();

	const pageNumber = useRef(0);
	const abortController = useRef(new AbortController());

	const [isLoading, setIsLoading] = useState(false);
	const [value, setValue] = useState('');
	const [stacks, setStacks] = useState<IStack[]>([]);
	const [isLastPage, setIsLastPage] = useState(false);

	const handleInputChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const _value = event.target.value;
			setValue(_value);
			pageNumber.current = 0;
			setStacks(() => []);
		},
		[]
	);

	const updateStacks = useCallback((newStacks: IStack[]) => {
		setStacks((prev) => {
			const filteredStacks = newStacks.filter((stack) => !prev.includes(stack));
			return [...prev, ...filteredStacks];
		});
	}, []);

	const fetchStacks = useCallback(async () => {
		abortController.current.abort(
			'Aborting search call because the search input changed'
		);
		abortController.current = new AbortController();
		try {
			setIsLoading(true);
			const response = await fetch(
				`/api/stacks?page=${pageNumber.current + 1}&search=${value}`,
				{ signal: abortController.current.signal }
			);
			const results = (await response.json()) as AllStacksResult;
			// console.log(results);
			updateStacks(results.results);
			setIsLastPage(
				results.pagination.pageNumber === results.pagination.pageCount
			);
			pageNumber.current = results.pagination.pageNumber;
		} catch (error: any) {
			console.log(error);
			throw Error(error.message);
		}
		setIsLoading(false);
	}, [updateStacks, value]);

	// Infinite scroll implementation BEGINS
	const observerTarget = useRef<HTMLBRElement | null>(null);

	const handleIntersection = useCallback(() => {
		/**
		 * Wait for the stacks to render, then check if the observer target is
		 * still in viewport
		 */
		return new Promise<void>((resolve, reject) => {
			setTimeout(async () => {
				const windowHeight = document.documentElement.clientHeight;
				const top = observerTarget.current!.getBoundingClientRect().top;
				console.log(windowHeight - top);
				const isInView = windowHeight - top > 0;
				/**
				 * If the observer target is still in viewport then fetch more stacks
				 * and rerun this function
				 */
				if (isInView && !isLastPage && !isLoading) {
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
	}, [fetchStacks, isLastPage, isLoading]);

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

	return (
		<>
			<Head>
				<title>TechChack | Profile</title>
				<meta
					name='description'
					content='Share your tech stack with the world'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			{/* <button onClick={() => signOut()}>Sign Out</button> */}
			<form className={styles.profileDetails}>
				<div className={styles.level1}>
					<div className={styles.left}>
						<Avatar url={user?.image || ''} />
						<div>{user?.name}</div>
					</div>
					<IconButton title='Edit Your Profile'>
						<PenIcon />
					</IconButton>
				</div>
				<div className={styles.level2}>
					<div className={styles.empty}>
						You don&apos;t have any tech stack in your shelf. Add one or more
						tech stack by clicking a stack below
					</div>
				</div>
			</form>
			<form className={styles.searchBar}>
				<label className={styles.inputContainer}>
					{
						<span className={styles.icon}>
							<SearchIcon />
						</span>
					}
					<input
						className={styles.input}
						placeholder='Search stacks'
						onChange={handleInputChange}
						type='text'
						value={value}
					/>
					<div className={styles.background} />
				</label>
			</form>
			<div className={styles.stacks}>
				{stacks.map((item) => (
					<Chip icon={item.icon} key={item.id} name={item.name} />
				))}
				{isLoading ? (
					<div className={styles.loader}>
						<LoaderIcon />
					</div>
				) : (
					''
				)}
			</div>
			<br ref={observerTarget} />
		</>
	);
};

export default Profile;
