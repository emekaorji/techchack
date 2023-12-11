import Link from 'next/link';
import styles from './desktopNav.module.css';
import IconButton from '@/components/interface/buttons/iconButton/iconButton';
import { signOut } from 'next-auth/react';
import Logout2Icon from '@/components/interface/icons/logout2';

const DesktopNav = () => {
	return (
		<>
			<div className={styles.menu}>
				<div className={styles.navItems}>
					<Link className={styles.navItem} href='/contribute'>
						Stacks
					</Link>
					<Link className={styles.navItem} href='/stacks'>
						Contribute
					</Link>
				</div>
				<IconButton
					className={styles.logoutButton}
					onClick={() => signOut()}
					title='Logout'>
					<Logout2Icon />
				</IconButton>
			</div>
		</>
	);
};

export default DesktopNav;
