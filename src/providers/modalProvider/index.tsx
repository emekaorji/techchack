import { ModalContextValue } from '@/types/context';
import {
	ReactNode,
	createContext,
	useCallback,
	useMemo,
	useState,
} from 'react';
import ModalLayout from './modal';
import { ModalOptions } from '@/types/modal';
import styles from './modal.module.css';
import useSluggishState from 'use-sluggish-state';
import getClassName from '@/utils/getClassName';

interface ModalProviderProps {
	children: ReactNode;
}

const ModalContext = createContext<ModalContextValue | null>(null);

const ModalProvider = ({ children }: ModalProviderProps) => {
	const [modal, setModal, loading, finalModal] = useSluggishState<{
		className: string;
		content: ReactNode;
		x: number;
		y: number;
		width: number;
		height: number;
	} | null>(null);

	const destroyModal = useCallback(() => {
		setModal(null, 500);
	}, [setModal]);

	const createModal = useCallback(
		function (content: ReactNode, options: ModalOptions) {
			const { className = '', x, y, width, height } = options;

			setModal({ className, content, x, y, width, height });
		},
		[setModal]
	);

	const providerValue = useMemo<ModalContextValue>(
		() => ({ createModal }),
		[createModal]
	);

	return (
		<ModalContext.Provider value={providerValue}>
			{children}
			<div
				className={
					styles.modalContainer + getClassName(!!finalModal, styles.active)
				}
				onClick={destroyModal}>
				{modal && (
					<ModalLayout
						className={modal.className}
						content={modal.content}
						destroyModal={destroyModal}
						isClosing={loading && finalModal === null}
						x={modal.x}
						y={modal.y}
						width={modal.width}
						height={modal.height}
					/>
				)}
			</div>
		</ModalContext.Provider>
	);
};

export { ModalContext };
export default ModalProvider;
