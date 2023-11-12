import Link from 'next/link';
import styles from './nav.module.css';

const Nav = () => {
	return (
		<>
			<nav className={styles.nav}>
				<h2 className={styles.left}>TechChack</h2>
				<div className={styles.right}>
					<Link href='/'></Link>
				</div>
			</nav>
		</>
	);
};

export default Nav;
