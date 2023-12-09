import DoubleArrowLeftIcon from '@/components/interface/icons/doubleArrowLeft';
import styles from './pagination.module.css';
import Pagination from 'react-paginate';
import useAllStacksContext from '../hooks/useAllStacksContext';
import ArrowRightIcon from '@/components/interface/icons/arrowRight';
import ArrowLeftIcon from '@/components/interface/icons/arrowLeft';
import DoubleArrowRightIcon from '@/components/interface/icons/doubleArrowRight';
import getClassName from '@/utils/getClassName';

const AllStacksPagination = () => {
	const { handlePageChange, isLoading, pagination } = useAllStacksContext();

	return pagination ? (
		<div
			className={
				styles.paginationContainer + getClassName(isLoading, styles.isLoading)
			}>
			<li className={styles.pageButton}>
				<a
					tabIndex={0}
					role='button'
					aria-disabled={pagination.pageNumber === 1}
					aria-label='First Page'>
					<DoubleArrowLeftIcon />
				</a>
			</li>
			<Pagination
				breakLabel='...'
				forcePage={pagination.pageNumber - 1}
				nextLabel={<ArrowRightIcon />}
				onPageChange={handlePageChange}
				className={styles.container}
				pageClassName={styles.pageButton}
				previousClassName={styles.prevButton}
				nextClassName={styles.nextButton}
				breakClassName={styles.breakButton}
				activeClassName={styles.activePage}
				pageCount={pagination.pageCount}
				pageRangeDisplayed={2}
				marginPagesDisplayed={2}
				previousLabel={<ArrowLeftIcon />}
				renderOnZeroPageCount={null}
			/>
			<li className={styles.pageButton}>
				<a
					tabIndex={0}
					role='button'
					aria-disabled={pagination.pageNumber === pagination.pageCount}
					aria-label='Last Page'>
					<DoubleArrowRightIcon />
				</a>
			</li>
		</div>
	) : (
		<></>
	);
};

export default AllStacksPagination;
