import DoubleArrowLeftIcon from '@/components/interface/icons/doubleArrowLeft';
import styles from './pagination.module.css';
import Pagination from 'react-paginate';
import useAllStacksContext from '../hooks/useAllStacksContext';
import ArrowRightIcon from '@/components/interface/icons/arrowRight';
import ArrowLeftIcon from '@/components/interface/icons/arrowLeft';
import DoubleArrowRightIcon from '@/components/interface/icons/doubleArrowRight';
import getClassName from '@/utils/getClassName';
import { useMemo } from 'react';

const AllStacksPagination = () => {
	const { goToPage, handlePageChange, isLoading, pagination } =
		useAllStacksContext();

	const [startIndex, endIndex] = useMemo(() => {
		if (!pagination) return [0, 0];
		console.log(pagination);

		const start = pagination.limit * (pagination.pageNumber - 1);

		const _startIndex = start + 1;
		let _endIndex = start + pagination.limit;
		if (_endIndex > pagination.total) {
			_endIndex = pagination.total;
		}

		return [_startIndex, _endIndex];
	}, [pagination]);

	if (!pagination) return <></>;

	console.log('pagination.pageNumber', pagination.pageNumber);

	return (
		<>
			<div
				className={
					styles.paginationContainer + getClassName(isLoading, styles.isLoading)
				}>
				<div className={styles.pageInfoContainer}>
					<h4>
						Showing {startIndex} - {endIndex} of {pagination.total}
					</h4>
				</div>
				<div className={styles.pageNumbersContainer}>
					<li className={styles.pageButton}>
						<a
							aria-disabled={pagination.pageNumber === 1}
							aria-label='First Page'
							onClick={() => goToPage(1)}
							role='button'
							tabIndex={0}>
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
						disableInitialCallback
					/>
					<li className={styles.pageButton}>
						<a
							aria-disabled={pagination.pageNumber === pagination.pageCount}
							aria-label='Last Page'
							onClick={() => goToPage(pagination.pageCount)}
							role='button'
							tabIndex={0}>
							<DoubleArrowRightIcon />
						</a>
					</li>
				</div>
			</div>
		</>
	);
};

export default AllStacksPagination;