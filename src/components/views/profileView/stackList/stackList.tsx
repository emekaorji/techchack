import useProfileViewContext from '../hooks/useProfileViewContext';
import styles from './stackList.module.css';

const StackList = () => {
	const { stacks } = useProfileViewContext();

	return (
		<>
			<div className={styles.stackList}>
				{stacks.map((item) => (
					<div key={item.id}>{item.name}</div>
				))}
			</div>
		</>
	);
};

export default StackList;
