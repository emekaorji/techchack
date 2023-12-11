import Link from 'next/link';
import styles from './mobileNav.module.css';
import { signOut } from 'next-auth/react';
import Logout2Icon from '@/components/interface/icons/logout2';
import Button from '@/components/interface/buttons/button/button';
import { useCallback, useState } from 'react';
import getClassName from '@/utils/getClassName';

const MobileNav = () => {
	const [isExpanded, setIsExpanded] = useState(false);

	const handleClick = () => setIsExpanded(false);

	const handleLogOut = useCallback(() => {
		handleClick();
		signOut();
	}, []);

	return (
		<>
			<button
				className={
					styles.menuButton + getClassName(isExpanded, styles.isExpanded)
				}
				onClick={() => setIsExpanded((prev) => !prev)}>
				<div />
				<div />
				<div />
			</button>
			<div
				className={styles.menu + getClassName(isExpanded, styles.isExpanded)}>
				<div className={styles.navItems}>
					<Link className={styles.navItem} href='/stacks' onClick={handleClick}>
						Stacks
					</Link>
					<Link
						className={styles.navItem}
						href='/contribute'
						onClick={handleClick}>
						Contribute
					</Link>
				</div>
				<Button
					className={styles.logoutButton}
					icon={<Logout2Icon />}
					onClick={handleLogOut}>
					Logout
				</Button>
			</div>
		</>
	);
};

export default MobileNav;
