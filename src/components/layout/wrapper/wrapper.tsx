import { CSSProperties, ReactNode } from 'react';
import Nav from '../nav/nav';
import { useRouter } from 'next/router';
import styles from './wrapper.module.css';
import useViewContext from '@/hooks/context/useViewContext';

interface WrapperProps {
	children: ReactNode;
}

const NO_LAYOUT_ROUTES = ['/login'];

const Wrapper = ({ children }: WrapperProps) => {
	const { pathname } = useRouter();
	const { background } = useViewContext();

	return (
		<>
			<div
				className={styles.wrapper}
				style={{ '--background': background } as CSSProperties}>
				{NO_LAYOUT_ROUTES.includes(pathname) ? '' : <Nav />}
				{children}
			</div>
		</>
	);
};

export default Wrapper;
