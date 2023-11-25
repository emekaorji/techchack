import Avatar from '@/components/interface/avatar/avatar';
import IconButton from '@/components/interface/buttons/iconButton/iconButton';
import PenIcon from '@/components/interface/icons/pen';
import useAuthContext from '@/hooks/context/useAuthContext';
import styles from './shelf.module.css';

const Shelf = () => {
	const { user } = useAuthContext();

	return (
		<>
			<form className={styles.profileDetails}>
				<div className={styles.level1}>
					<div className={styles.left}>
						<Avatar url={user?.image || ''} />
						<div>{user?.name}</div>
					</div>
					<IconButton title='Edit Your Profile'>
						<PenIcon />
					</IconButton>
				</div>
				<div className={styles.level2}>
					<div className={styles.empty}>
						You don&apos;t have any tech stack in your shelf. Add one or more
						tech stack by clicking a stack below
					</div>
				</div>
			</form>
		</>
	);
};

export default Shelf;
