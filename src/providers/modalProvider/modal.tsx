import { MouseEvent, ReactNode, useCallback } from 'react';
import IconButton from '@/components/interface/buttons/iconButton/iconButton';
import styles from './modal.module.css';
import XMarkIcon from '@/components/interface/icons/xMark';
import getClassName from '@/utils/getClassName';

interface ModalLayoutProps {
	destroyModal: () => void;
	className?: string;
	content: ReactNode;
	x: number;
	y: number;
}

function ModalLayout({ destroyModal, className, content }: ModalLayoutProps) {
	const handleContentClick = useCallback((event: MouseEvent) => {
		event.stopPropagation();
	}, []);

	return (
		<>
			<div className={styles.modalLayout} onClick={destroyModal}>
				<div
					className={styles.modalContent + getClassName(className)}
					onClick={handleContentClick}>
					<IconButton
						title='Close'
						onClick={destroyModal}
						className={styles.closeButton}>
						<XMarkIcon />
					</IconButton>
					<div className={styles.scrollContainer}>{content}</div>
				</div>
			</div>
		</>
	);
}

export default ModalLayout;
