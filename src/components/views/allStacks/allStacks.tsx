import { AllStacksResult } from '@/types/stack';
import AllStacksProvider from './provider/provider';
import AllStacksPagination from './pagination/pagination';
import styles from './allStacks.module.css';
import StackList from './stackList/stackList';
import StackSearch from './stackSearch/stackSearch';

interface AllStacksViewProps {
	allStacksResult?: AllStacksResult;
}

const AllStacksConsumer = () => {
	return (
		<>
			<div className={styles.container}>
				<StackSearch />
				<StackList />
				<AllStacksPagination />
				<br />
			</div>
		</>
	);
};

const AllStacksView = ({ allStacksResult }: AllStacksViewProps) => (
	<AllStacksProvider allStacksResult={allStacksResult}>
		<AllStacksConsumer />
	</AllStacksProvider>
);

export default AllStacksView;