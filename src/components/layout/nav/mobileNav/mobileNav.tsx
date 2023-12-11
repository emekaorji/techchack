import Link from 'next/link';
import styles from './mobileNav.module.css';
import { signOut } from 'next-auth/react';
import Logout2Icon from '@/components/interface/icons/logout2';
import Button from '@/components/interface/buttons/button/button';

const MobileNav = () => {
	return (
		<>
			<div className={styles.menuButton}>
				<div />
				<div />
				<div />
			</div>
			<div className={styles.menu}>
				<div className={styles.navItems}>
					<Link className={styles.navItem} href='/contribute'>
						Stacks
					</Link>
					<Link className={styles.navItem} href='/stacks'>
						Contribute
					</Link>
				</div>
				<Button
					className={styles.logoutButton}
					icon={<Logout2Icon />}
					onClick={() => signOut()}>
					Logout
				</Button>
			</div>
		</>
	);
};

export default MobileNav;
