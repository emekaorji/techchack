import LoaderIcon from '@/components/interface/icons/loader';
import SearchIcon from '@/components/interface/icons/search';
import styles from './stackSearch.module.css';
import useAllStacksContext from '../hooks/useAllStacksContext';

const StackSearch = () => {
	const {
		handleSearchInputChange,
		handleSearchSubmit,
		isLoading,
		searchValue,
	} = useAllStacksContext();

	return (
		<>
			<form className={styles.searchBar} onSubmit={handleSearchSubmit}>
				<label className={styles.inputContainer}>
					{
						<span className={styles.icon}>
							{isLoading ? <LoaderIcon /> : <SearchIcon />}
						</span>
					}
					<input
						className={styles.input}
						placeholder='Search stacks'
						onChange={handleSearchInputChange}
						type='text'
						value={searchValue}
						autoFocus
					/>
					<div className={styles.background} />
				</label>
			</form>
		</>
	);
};

export default StackSearch;
