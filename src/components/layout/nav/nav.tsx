import Link from 'next/link';
import styles from './nav.module.css';
import MobileNav from './mobileNav/mobileNav';
import DesktopNav from './desktopNav/desktopNav';

const Nav = () => {
	return (
		<>
			<nav className={styles.nav}>
				<Link className={styles.left} href='/'>
					TechChack
				</Link>
				<MobileNav />
				<DesktopNav />
			</nav>
		</>
	);
};

export default Nav;
