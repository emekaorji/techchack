import { ReactNode } from 'react';
import Nav from '../nav/nav';
import { useRouter } from 'next/router';
import styles from './wrapper.module.css';

interface WrapperProps {
	children: ReactNode;
}

const NO_LAYOUT_ROUTES = ['/login'];

const Wrapper = ({ children }: WrapperProps) => {
	const { pathname } = useRouter();

	return (
		<>
			<div className={styles.wrapper}>
				{NO_LAYOUT_ROUTES.includes(pathname) ? '' : <Nav />}
				{children}
			</div>
		</>
	);
};

export default Wrapper;
