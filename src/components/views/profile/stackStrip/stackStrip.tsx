import useModalContext from '@/hooks/context/useModalContext';
import { CSSProperties, MouseEvent, useCallback, useRef } from 'react';
import styles from './stackStrip.module.css';
import StackModal from '../stackModal/stackModal';
import { Tcategory } from '@/types/stack';

interface StackStripProps {
	icon: string;
	id: string;
	name: string;
	score: number;
	category: Tcategory;
	description: string;
	link: string;
	requirements: string[];
}

const StackStrip = ({
	icon,
	id,
	name,
	score,
	category,
	description,
	link,
	requirements,
}: StackStripProps) => {
	const { createModal } = useModalContext();
	const ref = useRef<HTMLButtonElement | null>(null);

	const handleModal = useCallback(
		(event: MouseEvent<HTMLButtonElement>) => {
			const currentTarget = event.currentTarget;
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
			<div className={styles.strip}>
				<button
					className={styles.stackIcon}
					dangerouslySetInnerHTML={{ __html: icon || '?' }}
					onClick={handleModal}
					ref={ref}
				/>
				<div className={styles.stackInfo}>
					<div className={styles.stackTitle}>
						<h3>{name}</h3>
						<p>Less than 1 year</p>
					</div>
					<div
						className={styles.proficiency}
						style={{ '--score': score } as CSSProperties}>
						<div className={styles.line} />
						<div className={styles.line} />
						<div className={styles.line} />
						<div className={styles.line} />
						<div className={styles.line} />
						<div className={styles.line} />
						<div className={styles.line} />
						<div className={styles.line} />
						<div className={styles.line} />
					</div>
				</div>
			</div>
		</>
	);
};

export default StackStrip;
