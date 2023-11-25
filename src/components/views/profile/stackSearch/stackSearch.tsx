import LoaderIcon from '@/components/interface/icons/loader';
import SearchIcon from '@/components/interface/icons/search';
import useProfileContext from '../hooks/useProfileContext';
import styles from './stackSearch.module.css';

const StackSearch = () => {
	const { handleSearchInputChange, isSearching, searchValue } =
		useProfileContext();

	return (
		<>
			<form className={styles.searchBar}>
				<label className={styles.inputContainer}>
					{
						<span className={styles.icon}>
							{isSearching ? <LoaderIcon /> : <SearchIcon />}
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
