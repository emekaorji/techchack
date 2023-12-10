import DoubleArrowLeftIcon from '@/components/interface/icons/doubleArrowLeft';
import styles from './pagination.module.css';
import Pagination from 'react-paginate';
import useAllStacksContext from '../hooks/useAllStacksContext';
import ArrowRightIcon from '@/components/interface/icons/arrowRight';
import ArrowLeftIcon from '@/components/interface/icons/arrowLeft';
import DoubleArrowRightIcon from '@/components/interface/icons/doubleArrowRight';
import getClassName from '@/utils/getClassName';
import { useMemo } from 'react';
import useDeviceSize from '@/hooks/view/useDeviceSize';

const AllStacksPagination = () => {
	const [width] = useDeviceSize();

	const {
		goToPage,
		handleOrderChange,
		handlePageChange,
		handlePerPageChange,
		isLoading,
		orderValue,
		pagination,
		perPageValue,
	} = useAllStacksContext();

	const [startIndex, endIndex] = useMemo(() => {
		if (!pagination) return [0, 0];

		const start = pagination.limit * (pagination.pageNumber - 1);

		const _startIndex = start + 1;
		let _endIndex = start + pagination.limit;
		if (_endIndex > pagination.total) {
			_endIndex = pagination.total;
		}

		return [_startIndex, _endIndex];
	}, [pagination]);

	if (!pagination) return <></>;

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
					<div className={styles.selectFilters}>
						<select
							name='Page Limit'
							onChange={handlePerPageChange}
							value={perPageValue}>
							<option value='5'>5</option>
							<option value='10'>10</option>
							<option value='15'>15</option>
							<option value='20'>20</option>
							<option value='25'>25</option>
							<option value='30'>30</option>
							<option value='40'>40</option>
							<option value='50'>50</option>
						</select>
						<select
							name='Order'
							onChange={handleOrderChange}
							value={orderValue}>
							<option value='asc'>Ascending</option>
							<option value='desc'>Descending</option>
						</select>
					</div>
				</div>
				<div className={styles.pageNumbersContainer}>
					<li
						className={
							styles.pageButton +
							getClassName(pagination.pageNumber === 1, styles.disabledButton)
						}>
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
						disabledClassName={styles.disabledButton}
						pageCount={pagination.pageCount}
						pageRangeDisplayed={width > 500 ? 2 : 1}
						marginPagesDisplayed={width > 450 ? 2 : 1}
						previousLabel={<ArrowLeftIcon />}
						renderOnZeroPageCount={null}
						disableInitialCallback
					/>
					<li
						className={
							styles.pageButton +
							getClassName(
								pagination.pageNumber === pagination.pageCount,
								styles.disabledButton
							)
						}>
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
