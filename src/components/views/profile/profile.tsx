import Head from 'next/head';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import SearchIcon from '@/components/interface/icons/search';
// import { signOut } from 'next-auth/react';
import stackData from '@/data/stacks.json';
import Chip from '@/components/interface/chip/chip';
import Avatar from '@/components/interface/avatar/avatar';
import useAuthContext from '@/hooks/context/useAuthContext';
import styles from './profile.module.css';
import IconButton from '@/components/interface/buttons/iconButton/iconButton';
import PenIcon from '@/components/interface/icons/pen';
import { IStack } from '@/types/stack';
import LoaderIcon from '@/components/interface/icons/loader';
import { AllStacksResult } from '@/types/api/stack';

const getBase64FromUrl = async (url: string) => {
	const data = await fetch(url);
	const blob = await data.blob();
	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.readAsDataURL(blob);
		reader.onloadend = () => {
			const base64data = reader.result;
			resolve(base64data);
		};
	});
};

const convertSVGtoDataURL = async (svgPath: string): Promise<string> => {
	try {
		const response = await fetch(svgPath);
		const result = await response.text();
		console.log(result);
	} catch (error) {
		console.log(error);
	}
	return '';
};

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
 */

/**
 * Categories of stack
 * 1. Languages - PHP, JavaScript, R, HTML, EJS, TypeScript, Rust, Go
 * 2. Libraries & Frameworks - React, NextJS, Laravel, AngularJS, D3.js
 * 3. Tools & Services - Amazon ECS, DatadogHQ, Netlify
 * 4. Environments - VSCode, JetBrains, Atom, Remix, StackBlitz, Visual Studio
 * 5. Concepts & Fields - Microservices, DevOps, Virtualization, Memoization
 */

const Profile = () => {
	const { user } = useAuthContext();

	const observerTarget = useRef(null);
	const pageNumber = useRef(0);
	const stash = useRef<IStack[]>([]);

	const [isSearching, setIsSearching] = useState(false);
	const [value, setValue] = useState('');
	const [stacks, setStacks] = useState<IStack[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const handleInputChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const _value = event.target.value;
			setValue(event.target.value);
		},
		[]
	);

	const updateStacks = useCallback((newStacks: IStack[]) => {
		setStacks((prev) => {
			const filteredStacks = newStacks.filter((stack) => !prev.includes(stack));
			return [...prev, ...filteredStacks];
		});
	}, []);

	const updateStash = useCallback((newStacks: IStack[]) => {
		const filteredStacks = newStacks.filter(
			(stack) => !stash.current.includes(stack)
		);
		stash.current = [...stash.current, ...filteredStacks];
	}, []);

	const fetchStacks = useCallback(async () => {
		console.log('page', pageNumber.current);
		try {
			setIsLoading(true);
			if (value) {
				pageNumber.current = 0;
				setIsSearching(true);
				setStacks([]);
			}
			const response = await fetch(
				`/api/stacks?page=${pageNumber.current + 1}&search=${value}`
			);
			const results = (await response.json()) as AllStacksResult;
			console.log(results);
			updateStacks(results.results);
			updateStash(results.results);
			pageNumber.current = results.page;
		} catch (error) {
			console.log(error);
		}
		setIsLoading(false);
		setIsSearching(false);
	}, [value, updateStacks, updateStash]);

	// Implement infinite scroll
	useEffect(() => {
		const _observerTarget = observerTarget.current;
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					fetchStacks();
				}
			},
			{ threshold: 1 }
		);

		if (_observerTarget) {
			observer.observe(_observerTarget);
		}

		return () => {
			if (_observerTarget) {
				observer.unobserve(_observerTarget);
			}
		};
	}, [fetchStacks, observerTarget]);

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
							{isSearching ? <LoaderIcon /> : <SearchIcon />}
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
