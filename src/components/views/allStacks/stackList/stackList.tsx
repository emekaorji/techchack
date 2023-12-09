import Placeholder from '@/components/interface/placeholder/placeholder';
import useAllStacksContext from '../hooks/useAllStacksContext';
import StackStrip from '../stackStrip/stackStrip';
import styles from './stackList.module.css';

const StackList = () => {
	const { isLoading, stacks } = useAllStacksContext();

	return (
		<>
			<div className={styles.stackList}>
				{isLoading
					? Array.from({ length: 10 }).map((_i, index) => (
							<Placeholder
								key={index}
								background='#1c7fee33'
								height='5em'
								index={index}
							/>
					  ))
					: stacks.map((stack) => <StackStrip key={stack.id} {...stack} />)}
			</div>
		</>
	);
};

export default StackList;
