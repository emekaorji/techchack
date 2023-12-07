import { useCallback, useRef, useState } from 'react';
import InfoIcon from '../../../interface/icons/info';
import useProfileContext from '../hooks/useProfileContext';
import styles from './stackChip.module.css';
import getClassName from '@/utils/getClassName';
import useModalContext from '@/hooks/context/useModalContext';

interface ChipProps {
	icon: string;
	id: string;
	name: string;
}

const StackChip = ({ id, icon, name }: ChipProps) => {
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

	return (
		<>
			<div className={styles.chipContainer} ref={chipContainer}>
				<div
					className={styles.background + getClassName(loading, styles.loading)}
				/>
				<div className={styles.chip}>
					{icon && (
						<span
							className={styles.icon}
							dangerouslySetInnerHTML={{ __html: icon }}
						/>
					)}
					<button
						className={styles.infoButton}
						onClick={(e) => {
							const currentTarget = chipContainer.current;
							if (!currentTarget) return;
							const target = currentTarget?.getBoundingClientRect();
							const x = target?.x || e.clientX;
							const y = target?.y || e.clientY;
							const width = target?.width || 0;
							const height = target?.height || 0;
							const radius =
								Number(
									window
										.getComputedStyle(currentTarget)
										.borderRadius.slice(0, -2)
								) || 0;
							createModal('modal', { x, y, width, height, radius });
						}}>
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
