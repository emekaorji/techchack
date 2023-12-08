import Avatar from '@/components/interface/avatar/avatar';
import IconButton from '@/components/interface/buttons/iconButton/iconButton';
import PenIcon from '@/components/interface/icons/pen';
import useAuthContext from '@/hooks/context/useAuthContext';
import styles from './shelf.module.css';
import { useState } from 'react';
import useProfileContext from '../hooks/useProfileContext';
import UpArrowIcon from '@/components/interface/icons/upArrow';
import getClassName from '@/utils/getClassName';
import StackStrip from '../stackStrip/stackStrip';

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
					{!mergedStacks.length && (
						<div className={styles.empty}>
							You don&apos;t have any tech stack in your shelf. Add one or more
							tech stack by clicking a stack below
						</div>
					)}
					{mergedStacks.map((item) => (
						<StackStrip
							icon={item.icon}
							id={item.id}
							key={item.id}
							name={item.name}
							score={item.score}
							category={item.category}
							description={item.description}
							link={item.link}
							requirements={item.requirements}
						/>
					))}
				</div>
				{mergedStacks.length > 6 && (
					<button
						className={
							styles.expandButton + getClassName(expanded, styles.expanded)
						}
						onClick={() => setExpanded((prev) => !prev)}>
						<UpArrowIcon />
					</button>
				)}
			</div>
		</>
	);
};

export default Shelf;
