import { signOut } from 'next-auth/react';
import Link from 'next/link';
import styles from './nav.module.css';
import IconButton from '@/components/interface/buttons/iconButton/iconButton';
import LogoutIcon from '@/components/interface/icons/logout';

const Nav = () => {
	return (
		<>
			<nav className={styles.nav}>
				<Link className={styles.left} href='/'>
					TechChack
				</Link>
				<div className={styles.right}>
					<Link href='/contribute'>Contribute</Link>
					<IconButton
						className={styles.logoutButton}
						onClick={() => signOut()}
						title='Logout'>
						<LogoutIcon />
					</IconButton>
				</div>
			</nav>
		</>
	);
};

export default Nav;
