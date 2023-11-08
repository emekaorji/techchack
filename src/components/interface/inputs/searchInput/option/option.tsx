import { useCallback, useEffect, useRef } from 'react';
import styles from './option.module.css';
import getClassName from '@/utils/getClassName';

interface OptionProps {
	isSelected: boolean;
	onOptionClick: (value: string) => void;
	value: string;
}

const Option = ({ isSelected, onOptionClick, value }: OptionProps) => {
	const optionRef = useRef<HTMLButtonElement>(null);

	const handleClick = useCallback(() => {
		onOptionClick(value);
	}, [value, onOptionClick]);

	useEffect(() => {
		if (isSelected) {
			optionRef.current?.scrollIntoView({
				block: 'center',
			});
		}
	}, [isSelected]);

	return (
		<>
			<button
				data-name='searchOption'
				className={styles.option + getClassName(isSelected, styles.isSelected)}
				onClick={handleClick}
				ref={optionRef}
				type='button'>
				{value}
			</button>
		</>
	);
};

export default Option;
