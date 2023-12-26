/* eslint-disable react/display-name */
import { HTMLAttributes, ReactNode, forwardRef } from 'react';
import styles from './link.module.css';
import getClassName from '@/utils/getClassName';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';

interface LinkChildProps {
	children: ReactNode;
	icon?: JSX.Element;
	iconPosition?: 'left' | 'right';
	iconSize: 'small' | 'medium' | 'large';
}

const LinkChild = ({
	icon,
	iconPosition,
	iconSize,
	children,
}: LinkChildProps) => {
	return icon ? (
		<>
			{iconPosition === 'right' && <span>{children}</span>}
			<span className={styles.icon + ` ${styles[iconSize]}`}>{icon}</span>
			{iconPosition === 'left' && <span>{children}</span>}
		</>
	) : (
		<>{children}</>
	);
};

interface LinkProps extends NextLinkProps, HTMLAttributes<HTMLAnchorElement> {
	children: ReactNode;
	className?: string;
	icon?: JSX.Element;
	iconPosition?: 'left' | 'right';
	iconSize?: 'small' | 'medium' | 'large';
}

const ButtonLink = forwardRef<HTMLAnchorElement, LinkProps>(
	(
		{
			children,
			className,
			icon,
			iconPosition = 'left',
			iconSize = 'medium',
			...props
		},
		ref
	) => {
		return (
			<>
				<NextLink
					ref={ref}
					className={styles.button + getClassName(className)}
					{...props}>
					<LinkChild
						icon={icon}
						iconPosition={iconPosition}
						iconSize={iconSize}>
						{children}
					</LinkChild>
				</NextLink>
			</>
		);
	}
);

export default ButtonLink;
