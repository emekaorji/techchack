import Head from 'next/head';
import styles from './dashboard.module.css';
import { ChangeEvent, useCallback, useState } from 'react';
import SearchIcon from '@/components/interface/icons/search';
// import { signOut } from 'next-auth/react';
import useAuthContext from '@/hooks/context/useAuthContext';
import stackData from '@/data/stacks.json';
import Chip from '@/components/interface/chip/chip';

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
					<label className={styles.inputContainer}>
						<span className={styles.icon}>
							<SearchIcon />
						</span>
						<input
							className={styles.input}
							onChange={handleInputChange}
							type='text'
							value={value}
						/>
						<div className={styles.background} />
					</label>
				</form>
				<div className={styles.stacks}>
					{stackData.map((item) => (
						<Chip icon={item.icon} key={item.name} name={item.name} />
					))}
				</div>
			</div>
		</>
	);
};

export default Dashboard;
