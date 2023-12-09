import useAllStacksContext from '../hooks/useAllStacksContext';
import StackStrip from '../stackStrip/stackStrip';
import styles from './stackList.module.css';

const StackList = () => {
	const { stacks } = useAllStacksContext();

	return (
		<>
			<div className={styles.stackList}>
				{stacks.map((stack) => (
					<StackStrip key={stack.id} {...stack} />
				))}
			</div>
		</>
	);
};

export default StackList;
