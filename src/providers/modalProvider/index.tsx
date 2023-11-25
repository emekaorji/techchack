import { ModalContextValue } from '@/types/context';
import {
	ReactNode,
	createContext,
	useCallback,
	useMemo,
	useState,
} from 'react';
import ModalLayout from './modal';
import { ModalContent, ModalOptions } from '@/types/modal';
import getRandomId from '@/utils/getRandomId';
import styles from './modal.module.css';

interface ModalProviderProps {
	children: ReactNode;
}

const ModalContext = createContext<ModalContextValue | null>(null);

const ModalProvider = ({ children }: ModalProviderProps) => {
	const [modals, setModals] = useState<ReactNode[]>([]);

	const destroyModal = useCallback((modalId: string) => {
		setModals((prev) => {
			const newModals = prev.filter(
				(item) => (item as JSX.Element).props.id !== modalId
			);
			return [...newModals];
		});
	}, []);

	const createModal = useCallback(
		function <T = undefined>(content: ModalContent<T>, options?: ModalOptions) {
			const className = options?.className;
			const closeButton = options?.closeButton || true;
			const modalId = getRandomId();
			const triggerElement = options?.triggerElement;

			const handleDestroyModal = () => {
				if (triggerElement) triggerElement.focus();
				destroyModal(modalId);
			};

			return new Promise<T>((resolve, reject) => {
				setModals((prev) => {
					prev.push(
						<ModalLayout<T>
							className={className}
							closeButton={closeButton}
							content={content}
							destroyModal={handleDestroyModal}
							id={modalId}
							key={modalId}
							reject={reject}
							resolve={resolve}
							triggerElement={triggerElement}
						/>
					);
					return [...prev];
				});
			});
		},
		[destroyModal]
	);

	const providerValue = useMemo<ModalContextValue>(
		() => ({ createModal }),
		[createModal]
	);

	return (
		<ModalContext.Provider value={providerValue}>
			{children}
			<div className={styles.modalContainer}>{modals}</div>
		</ModalContext.Provider>
	);
};

export { ModalContext };
export default ModalProvider;
