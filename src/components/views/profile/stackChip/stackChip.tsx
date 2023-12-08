import { MouseEvent, useCallback, useRef, useState } from 'react';
import InfoIcon from '../../../interface/icons/info';
import useProfileContext from '../hooks/useProfileContext';
import styles from './stackChip.module.css';
import getClassName from '@/utils/getClassName';
import useModalContext from '@/hooks/context/useModalContext';
import { Tcategory } from '@/types/stack';
import StackModal from '../stackModal/stackModal';

interface ChipProps {
	icon: string;
	id: string;
	name: string;
	category: Tcategory;
	description: string;
	link: string;
	requirements: string[];
}

const StackChip = ({
	id,
	icon,
	name,
	category,
	description,
	link,
	requirements,
}: ChipProps) => {
	const { createModal } = useModalContext();
	const { addStack } = useProfileContext();

	const [loading, setLoading] = useState(false);
	const chipContainer = useRef<HTMLDivElement | null>(null);

	const handleAddStack = useCallback(async () => {
		if (loading) return;
		try {
			setLoading(true);
			await addStack(id);
		} catch (error: any) {
			console.error(error);
		}
		setLoading(false);
	}, [addStack, id, loading]);

	const handleModal = useCallback(
		(event: MouseEvent<HTMLButtonElement>) => {
			const currentTarget = chipContainer.current;
			if (!currentTarget) return;
			const target = currentTarget?.getBoundingClientRect();
			const x = target?.x || event.clientX;
			const y = target?.y || event.clientY;
			const width = target?.width || 0;
			const height = target?.height || 0;
			const radius =
				Number(
					window.getComputedStyle(currentTarget).borderRadius.slice(0, -2)
				) || 0;
			createModal(
				<StackModal
					{...{ id, icon, name, category, description, link, requirements }}
				/>,
				{ x, y, width, height, radius }
			);
		},
		[category, createModal, description, icon, id, link, name, requirements]
	);

	return (
		<>
			<div
				className={styles.chipContainer + getClassName(loading, styles.loading)}
				ref={chipContainer}>
				<div className={styles.background} />
				<div className={styles.chip}>
					<span
						className={styles.icon}
						dangerouslySetInnerHTML={{ __html: icon || '?' }}
					/>
					<button
						className={styles.infoButton}
						disabled={loading}
						onClick={handleModal}>
						<InfoIcon />
					</button>
					<span className={styles.name}>{name}</span>
					<button
						className={styles.overlayButton}
						disabled={loading}
						onClick={handleAddStack}
					/>
				</div>
			</div>
		</>
	);
};

export default StackChip;
