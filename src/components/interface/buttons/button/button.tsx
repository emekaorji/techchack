/* eslint-disable react/display-name */
import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';
import styles from './button.module.css';
import LoaderIcon from '../../icons/loader';
import getClassName from '@/utils/getClassName';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	className?: string;
	icon?: JSX.Element;
	iconPosition?: 'left' | 'right';
	iconSize?: 'small' | 'medium' | 'large';
	loading?: boolean;
	loadingIcon?: JSX.Element;
	disabled?: boolean;
}

interface ButtonChildProps {
	children: ReactNode;
	icon?: JSX.Element;
	iconPosition?: 'left' | 'right';
	iconSize: 'small' | 'medium' | 'large';
	loading?: boolean;
	loadingIcon?: JSX.Element;
}

const ButtonChild = ({
	icon,
	iconPosition,
	iconSize,
	loading,
	loadingIcon,
	children,
}: ButtonChildProps) => {
	const _loadingIcon = loadingIcon || <LoaderIcon />;

	return icon ? (
		<>
			{iconPosition === 'right' && <span>{children}</span>}
			<span
				className={
					styles.icon +
					` ${styles[iconSize]}` +
					getClassName(loading, styles.loading)
				}>
				{loading ? _loadingIcon : icon}
			</span>
			{iconPosition === 'left' && <span>{children}</span>}
		</>
	) : (
		<>
			{loading ? <span className={styles.icon}>{_loadingIcon}</span> : children}
		</>
	);
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			children,
			className,
			disabled,
			icon,
			iconPosition = 'left',
			iconSize = 'medium',
			loading = false,
			loadingIcon,
			type = 'button',
			...props
		},
		ref
	) => {
		return (
			<>
				<button
					ref={ref}
					className={styles.button + getClassName(className)}
					disabled={disabled ?? loading}
					type={type}
					{...props}>
					<ButtonChild
						icon={icon}
						iconPosition={iconPosition}
						iconSize={iconSize}
						loading={loading}
						loadingIcon={loadingIcon}>
						{children}
					</ButtonChild>
				</button>
			</>
		);
	}
);

export default Button;
