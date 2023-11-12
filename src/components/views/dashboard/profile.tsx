import Head from 'next/head';
import { ChangeEvent, useCallback, useState } from 'react';
import SearchIcon from '@/components/interface/icons/search';
// import { signOut } from 'next-auth/react';
import stackData from '@/data/stacks.json';
import Chip from '@/components/interface/chip/chip';
import Avatar from '@/components/interface/avatar/avatar';
import useAuthContext from '@/hooks/context/useAuthContext';
import styles from './profile.module.css';
import IconButton from '@/components/interface/buttons/iconButton/iconButton';
import PenIcon from '@/components/interface/icons/pen';

const Profile = () => {
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
						You have not added any tech stack to your shelf. Add one or more
						tech stack by clicking a stack below
					</div>
				</div>
			</form>
			<form className={styles.searchBar}>
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
		</>
	);
};

export default Profile;
