import Avatar from '@/components/interface/avatar/avatar';
import IconButton from '@/components/interface/buttons/iconButton/iconButton';
import PenIcon from '@/components/interface/icons/pen';
import useAuthContext from '@/hooks/context/useAuthContext';
import styles from './shelf.module.css';
import JavaScriptIcon from '@/components/interface/icons/javaScript';
import { CSSProperties } from 'react';

const Shelf = () => {
	const { user } = useAuthContext();

	return (
		<>
			<div className={styles.profileDetails}>
				<div className={styles.level1}>
					<div className={styles.left}>
						<Avatar url={user?.image || ''} />
						<div>{user?.name}</div>
					</div>
					<IconButton title='Edit Your Profile'>
						<PenIcon />
					</IconButton>
				</div>
				<br />
				<div className={styles.level2}>
					{/* <div className={styles.empty}>
						You don&apos;t have any tech stack in your shelf. Add one or more
						tech stack by clicking a stack below
					</div> */}
					{user?.stacks.map((item) => (
						<StackStrip key={item.id} score={item.score} />
					))}
				</div>
			</div>
		</>
	);
};

interface StackStripProps {
	score: number;
}

const StackStrip = ({ score }: StackStripProps) => {
	return (
		<>
			<div className={styles.strip}>
				<div className={styles.stackIcon}>
					<JavaScriptIcon />
				</div>
				<div className={styles.stackInfo}>
					<div className={styles.stackTitle}>
						<h3>JavaScript</h3>
						<p>Less than 1 year</p>
					</div>
					<div
						className={styles.proficiency}
						style={{ '--score': score } as CSSProperties}>
						<div className={styles.line} />
						<div className={styles.line} />
						<div className={styles.line} />
						<div className={styles.line} />
						<div className={styles.line} />
						<div className={styles.line} />
						<div className={styles.line} />
						<div className={styles.line} />
						<div className={styles.line} />
					</div>
				</div>
			</div>
		</>
	);
};

export default Shelf;
