import LoaderIcon from '@/components/interface/icons/loader';
import StackChip from '../stackChip/stackChip';
import styles from './stackList.module.css';
import useProfileContext from '../hooks/useProfileContext';

const StackList = () => {
	const { isLoading, stacks } = useProfileContext();

	return (
		<>
			<div className={styles.stacks}>
				{stacks.map((item) => (
					<StackChip
						id={item.id}
						icon={item.icon}
						key={item.id}
						name={item.name}
					/>
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
