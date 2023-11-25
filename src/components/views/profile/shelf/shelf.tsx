import Avatar from '@/components/interface/avatar/avatar';
import IconButton from '@/components/interface/buttons/iconButton/iconButton';
import PenIcon from '@/components/interface/icons/pen';
import useAuthContext from '@/hooks/context/useAuthContext';
import styles from './shelf.module.css';
import { CSSProperties, useState } from 'react';
import useProfileContext from '../hooks/useProfileContext';
import UpArrowIcon from '@/components/interface/icons/upArrow';
import getClassName from '@/utils/getClassName';

const Shelf = () => {
	const { user } = useAuthContext();
	const { mergedStacks } = useProfileContext();

	const [expanded, setExpanded] = useState(false);

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
				<div
					className={styles.level2 + getClassName(expanded, styles.expanded)}>
					{/* <div className={styles.empty}>
						You don&apos;t have any tech stack in your shelf. Add one or more
						tech stack by clicking a stack below
					</div> */}
					{mergedStacks.map((item) => (
						<StackStrip
							icon={item.icon}
							key={item.id}
							name={item.name}
							score={item.score}
						/>
					))}
				</div>
				<button
					className={
						styles.expandButton + getClassName(expanded, styles.expanded)
					}
					onClick={() => setExpanded((prev) => !prev)}>
					<UpArrowIcon />
				</button>
			</div>
		</>
	);
};

interface StackStripProps {
	icon: string;
	name: string;
	score: number;
}

const StackStrip = ({ icon, name, score }: StackStripProps) => {
	return (
		<>
			<div className={styles.strip}>
				<div
					className={styles.stackIcon}
					dangerouslySetInnerHTML={{ __html: icon }}
				/>
				<div className={styles.stackInfo}>
					<div className={styles.stackTitle}>
						<h3>{name}</h3>
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
