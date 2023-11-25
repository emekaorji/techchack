import LoaderIcon from '@/components/interface/icons/loader';
import Chip from '../chip/chip';
import styles from './stackList.module.css';
import useProfileContext from '../hooks/useProfileContext';

const StackList = () => {
	const { isLoading, stacks } = useProfileContext();

	return (
		<>
			<div className={styles.stacks}>
				{stacks.map((item) => (
					<Chip id={item.id} icon={item.icon} key={item.id} name={item.name} />
				))}
				{isLoading ? (
					<div className={styles.loader}>
						<LoaderIcon />
					</div>
				) : (
					''
				)}
			</div>
		</>
	);
};

export default StackList;
