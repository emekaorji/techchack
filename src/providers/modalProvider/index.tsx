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

interface ModalProviderProps {
	children: ReactNode;
}

const ModalContext = createContext<ModalContextValue | null>(null);

const ModalProvider = ({ children }: ModalProviderProps) => {
	const [modal, setModal] = useSluggishState<{
		className: string;
		content: ReactNode;
		x: number;
		y: number;
	} | null>(null, 2000);

	const destroyModal = useCallback(() => {
		setModal(null);
	}, [setModal]);

	const createModal = useCallback(
		function (content: ReactNode, options: ModalOptions) {
			const { className = '', x, y } = options;

			setModal({ className, content, x, y });
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
			<div className={styles.modalContainer}>
				{modal && (
					<ModalLayout
						className={modal.className}
						content={modal.content}
						destroyModal={destroyModal}
						x={modal.x}
						y={modal.y}
					/>
				)}
			</div>
		</ModalContext.Provider>
	);
};

export { ModalContext };
export default ModalProvider;
