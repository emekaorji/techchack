import Avatar from '@/components/interface/avatar/avatar';
import useAuthContext from '@/hooks/context/useAuthContext';
import styles from './stackShelf.module.css';
import { useState } from 'react';
import useProfileContext from '../hooks/useProfileContext';
import UpArrowIcon from '@/components/interface/icons/upArrow';
import getClassName from '@/utils/getClassName';
import StackStrip from '../stackStrip/stackStrip';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ViewLinkIcon from '@/components/interface/icons/viewLink';
import ButtonLink from '@/components/interface/links/link/link';

const StackShelf = () => {
	const router = useRouter();

	const { user } = useAuthContext();
	const { mergedStacks } = useProfileContext();

	const [expanded, setExpanded] = useState(false);

	return (
		<>
			<div className={styles.profileDetails}>
				<div className={styles.level1}>
					<Link className={styles.left} href='/profile/view'>
						<Avatar url={user?.image || ''} />
						<div>{user?.name}</div>
					</Link>
					<ButtonLink
						href='/profile/view'
						icon={<ViewLinkIcon />}
						iconSize='small'
						iconPosition='right'
						title='View & Edit Your Profile'>
						View Full Profile
					</ButtonLink>
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

export default StackShelf;
