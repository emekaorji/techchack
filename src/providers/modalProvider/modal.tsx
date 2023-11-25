import { MouseEvent, useCallback, useEffect, useRef } from 'react';
import IconButton from '@/components/interface/buttons/iconButton/iconButton';
import styles from './modal.module.css';
import { ModalContent, Reject } from '@/types/modal';
import XMarkIcon from '@/components/interface/icons/xMark';
import getClassName from '@/utils/getClassName';

interface ModalLayoutProps<T> {
	destroyModal: () => void;
	className?: string;
	closeButton: boolean;
	content: ModalContent<T>;
	id: string;
	reject: Reject;
	resolve: (value: T | PromiseLike<T>) => void;
	triggerElement?: HTMLElement;
}

function ModalLayout<T>({
	destroyModal,
	className,
	closeButton,
	content,
	id: _id,
	reject,
	resolve,
	triggerElement,
}: ModalLayoutProps<T>) {
	const actionElementRef = useRef<HTMLButtonElement | null>(null);

	useEffect(() => {
		actionElementRef.current?.focus();
		console.log(actionElementRef);
	}, []);

	useEffect(() => {
		triggerElement?.blur();
	}, [triggerElement]);

	const handleResolve = useCallback(
		function (value?: T) {
			resolve(value || (true as T));
			destroyModal();
		},
		[destroyModal, resolve]
	);

	const handleReject = useCallback(
		(reason?: any) => {
			reject(reason);
			destroyModal();
		},
		[destroyModal, reject]
	);

	const handleClose = useCallback(() => {
		handleReject('Modal was closed');
	}, [handleReject]);

	const modalContent =
		typeof content === 'function'
			? content({
					resolve: handleResolve,
					reject: handleReject,
					actionElementRef,
			  })
			: content;

	const handleClickOutside = useCallback(() => {
		handleClose();
	}, [handleClose]);

	const handleContentClick = useCallback((event: MouseEvent) => {
		event.stopPropagation();
	}, []);

	return (
		<>
			<div className={styles.modalLayout} onClick={handleClickOutside}>
				<div
					className={styles.modalContent + getClassName(className)}
					onClick={handleContentClick}>
					{closeButton && (
						<IconButton
							title='Close'
							onClick={handleClose}
							className={styles.closeButton}>
							<XMarkIcon />
						</IconButton>
					)}
					<div className={styles.scrollContainer}>{modalContent}</div>
				</div>
			</div>
		</>
	);
}

export default ModalLayout;
