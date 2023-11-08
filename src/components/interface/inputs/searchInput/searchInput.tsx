import {
	ChangeEvent,
	FocusEvent,
	FormEvent,
	ForwardRefExoticComponent,
	InputHTMLAttributes,
	KeyboardEvent,
	ReactNode,
	RefAttributes,
	forwardRef,
	useCallback,
	useImperativeHandle,
	useMemo,
	useRef,
	useState,
} from 'react';
import Fuse, { IFuseOptions } from 'fuse.js';
import SearchIcon from '../../icons/search';
import Option from './option/option';
import styles from './searchInput.module.css';
import getClassName from '@/utils/getClassName';
import IconButton from '../../buttons/iconButton/iconButton';
import XMarkIcon from '../../icons/xMark';

interface SearchInputPropsWithoutButton
	extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onSelect'> {
	// buttonTitle?: string;
	fuseObject?: Fuse<string>;
	fuseOptions?: IFuseOptions<string>;
	icon?: ReactNode;
	inputClassName?: string;
	// onButtonClick?: () => void;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void | Promise<void>;
	onSelect?: (event: SelectEvent) => (boolean | void) | Promise<boolean | void>;
	onSubmit?: (event: FormEvent) => void | Promise<void>;
	searchReplacer?: (search: string) => string;
	suggestions?: string[];
	value?: string;
}

type ButtonProps =
	| {
			buttonTitle: string;
			onButtonClick: () => void;
	  }
	| {
			buttonTitle?: never;
			onButtonClick?: never;
	  };

type SearchInputProps = SearchInputPropsWithoutButton & ButtonProps;

const options: IFuseOptions<string> = {
	includeScore: true,
	threshold: 0.5,
};

const SearchInput: ForwardRefExoticComponent<
	SearchInputProps & RefAttributes<HTMLInputElement | null>
> = forwardRef<HTMLInputElement | null, SearchInputProps>(
	(
		{
			buttonTitle,
			className,
			fuseObject,
			fuseOptions,
			icon = <SearchIcon />,
			inputClassName,
			placeholder,
			onBlur,
			onButtonClick,
			onChange,
			onSelect,
			onSubmit,
			searchReplacer,
			suggestions = [],
			value,
			...props
		},
		ref
	) => {
		// @ts-ignore
		const suggestionsRef = useRef<string[]>(fuseObject?._docs || suggestions);

		const [privatevalue, setPrivateValue] = useState('');
		const [optionListVisible, setOptionListVisible] = useState(false);
		const [optionsList, setOptionsList] = useState<string[]>(
			suggestionsRef.current.map((item) => `${item}`)
		);
		const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);

		const inputRef = useRef<HTMLInputElement>(null);
		const fuse = useRef(
			fuseObject ||
				new Fuse(
					suggestionsRef.current.map((item) => `${item}`),
					fuseOptions || options
				)
		);

		const actualValue = useMemo(
			() => (value && onChange ? value : privatevalue),
			[onChange, privatevalue, value]
		);

		useImperativeHandle(ref, () => inputRef.current!, []);

		const showList = useCallback(() => {
			setOptionListVisible(true);
		}, []);
		const hideList = useCallback(
			(event?: FocusEvent<HTMLInputElement>) => {
				if (!optionListVisible) return;
				if (
					event &&
					(event.relatedTarget! as HTMLElement)?.dataset.name === 'searchOption'
				)
					return;
				setOptionListVisible(false);
			},
			[optionListVisible]
		);
		const resetFocus = useCallback(() => setSelectedOptionIndex(0), []);
		const incrementFocus = useCallback(
			() => setSelectedOptionIndex((prev) => prev + 1),
			[]
		);
		const decrementFocus = useCallback(
			() => setSelectedOptionIndex((prev) => prev - 1),
			[]
		);

		const changeHandler = useCallback(
			(_value: string) => {
				resetFocus();

				if (_value) {
					const result = fuse.current.search(_value);
					setOptionsList(result.map((i) => i.item));
				} else {
					setOptionsList(suggestionsRef.current);
				}
			},
			[resetFocus]
		);

		const handleChange = useCallback(
			(event: ChangeEvent<HTMLInputElement>) => {
				let _value = event.target.value;
				if (onChange) {
					onChange(event);
				} else {
					setPrivateValue(_value);
				}

				if (searchReplacer) {
					_value = searchReplacer(_value);
				}

				changeHandler(_value);
				showList();
			},
			[onChange, searchReplacer, changeHandler, showList]
		);

		const handleSelect = useCallback(
			(_value: string) => {
				const event = {
					target: { value: _value },
					currentTarget: { value: _value },
				};

				inputRef.current?.focus();

				if (onSelect) {
					const shouldDismissList = onSelect(event);
					if (shouldDismissList) {
						hideList();
					} else {
						showList();
					}
				} else {
					setPrivateValue(_value);
				}

				changeHandler(_value);
			},
			[onSelect, changeHandler, hideList, showList]
		);

		const handleKeyDown = useCallback(
			(event: KeyboardEvent<HTMLInputElement>) => {
				const isUpArrowKey = event.keyCode === 38;
				const isDownArrowKey = event.keyCode === 40;
				const isEscapekey = event.keyCode === 27;
				const isEnterKey = event.keyCode === 13;
				const isUpperBound = selectedOptionIndex > 0;
				const isLowerBound = selectedOptionIndex < optionsList.length - 1;

				if (optionListVisible) {
					if (isUpArrowKey) {
						event.preventDefault();
						if (isUpperBound) decrementFocus();
					}
					if (isDownArrowKey) {
						event.preventDefault();
						if (isLowerBound) incrementFocus();
					}
				}
				if (isEscapekey) {
					hideList();
				}
				if (isEnterKey) {
					const focusedItem = optionsList.find(
						(_item, index) => index === selectedOptionIndex
					);
					if (focusedItem) {
						handleSelect(focusedItem);
					} else {
						handleSelect(actualValue);
						hideList();
					}
				}
			},
			[
				selectedOptionIndex,
				optionsList,
				optionListVisible,
				decrementFocus,
				incrementFocus,
				hideList,
				handleSelect,
				actualValue,
			]
		);

		const handleBlur = useCallback(
			(event: FocusEvent<HTMLInputElement>) => {
				hideList(event);
				if (onBlur) onBlur(event);
			},
			[hideList, onBlur]
		);

		const handleSubmit = useCallback(
			(event: FormEvent) => {
				event.preventDefault();
				if (onSubmit) onSubmit(event);
			},
			[onSubmit]
		);

		const handleClearSearch = useCallback(() => {
			const event = {
				target: { value: '' },
				currentTarget: { value: '' },
			};
			setPrivateValue('');
			if (onChange) onChange(event as ChangeEvent<HTMLInputElement>);
			inputRef.current?.focus();
		}, [onChange]);

		return (
			<>
				<form
					onSubmit={handleSubmit}
					className={styles.inputContainer + getClassName(className)}>
					{onButtonClick !== undefined && buttonTitle !== undefined ? (
						<IconButton
							className={styles.iconButton}
							onClick={onButtonClick}
							size='small'
							title={buttonTitle}>
							{icon}
						</IconButton>
					) : (
						<div
							className={styles.icon}
							onClick={() => inputRef.current?.focus()}>
							{icon}
						</div>
					)}
					<input
						className={styles.input + getClassName(inputClassName)}
						onBlur={handleBlur}
						onChange={handleChange}
						onKeyDown={handleKeyDown}
						onMouseDown={showList}
						placeholder={placeholder || 'Search for something...'}
						ref={inputRef}
						type='text'
						value={actualValue}
						{...props}
					/>
					{(privatevalue || value) && (
						<IconButton
							className={styles.cancelButton}
							onClick={handleClearSearch}
							size='small'
							title='Clear Search'>
							<XMarkIcon />
						</IconButton>
					)}
					{optionListVisible && optionsList.length > 0 && (
						<div className={styles.list}>
							{optionsList.map((item, index) => (
								<Option
									isSelected={selectedOptionIndex === index}
									key={item}
									onOptionClick={handleSelect}
									value={item}
								/>
							))}
						</div>
					)}
				</form>
			</>
		);
	}
);

export default SearchInput;
