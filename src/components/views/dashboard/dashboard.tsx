import Head from 'next/head';
import styles from './dashboard.module.css';
import { ChangeEvent, useCallback, useState } from 'react';
import SearchIcon from '@/components/interface/icons/search';
// import { signOut } from 'next-auth/react';
import useAuthContext from '@/hooks/context/useAuthContext';

const Dashboard = () => {
	const { user } = useAuthContext();
	const [value, setValue] = useState('');

	const handleInputChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			setValue(event.target.value);
		},
		[]
	);

	return (
		<>
			<Head>
				<title>TechChack | Dashboard</title>
				<meta
					name='description'
					content='Share your tech stack with the world'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className={styles.container}>
				<h1>TechChack</h1>
				<p>{user?.email}</p>
				{/* <button onClick={() => signOut()}>Sign Out</button> */}
				<form>
					<div className={styles.inputContainer}>
						<span className={styles.icon}>
							<SearchIcon />
						</span>
						<input
							className={styles.input}
							onChange={handleInputChange}
							type='text'
							value={value}
						/>
					</div>
				</form>
				<div className={styles.stacks}></div>
			</div>
		</>
	);
};

export default Dashboard;
