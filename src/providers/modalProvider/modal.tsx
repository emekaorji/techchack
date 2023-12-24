import { CSSProperties, MouseEvent, ReactNode, useCallback } from 'react';
import IconButton from '@/components/interface/buttons/iconButton/iconButton';
import styles from './modal.module.css';
import XMarkIcon from '@/components/interface/icons/xMark';
import getClassName from '@/utils/getClassName';
import useDeviceSize from '@/hooks/view/useDeviceSize';

interface ModalLayoutProps {
	destroyModal: () => void;
	className?: string;
	content: ReactNode;
	isClosing: boolean;
	x: number;
	y: number;
	width: number;
	height: number;
	radius: number;
}

function ModalLayout({
	destroyModal,
	className,
	content,
	isClosing,
	x,
	y,
	width,
	height,
	radius,
}: ModalLayoutProps) {
	const handleContentClick = useCallback((event: MouseEvent) => {
		event.stopPropagation();
	}, []);
	const [documentWidth] = useDeviceSize();

	return (
		<>
			<div
				className={
					styles.modalContent +
					getClassName(isClosing, styles.isClosing) +
					getClassName(className)
				}
				onClick={handleContentClick}
				style={(() => {
					const endX =
						0.7 * documentWidth < 800
							? 0.15 * documentWidth
							: (documentWidth - 800) / 2;

					return {
						'--top': `${y}px`,
						'--left': `${x}px`,
						'--endLeft': `${endX}px`,
						'--height': `${height}px`,
						'--width': `${width}px`,
						'--radius': `${radius}px`,
					} as CSSProperties;
				})()}>
				<IconButton
					title='Close'
					onClick={destroyModal}
					className={styles.closeButton}>
					<XMarkIcon />
				</IconButton>
				<div className={styles.scrollContainer}>{content}</div>
			</div>
		</>
	);
}

export default ModalLayout;
