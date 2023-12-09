import useModalContext from '@/hooks/context/useModalContext';
import {
	CSSProperties,
	MouseEvent,
	useCallback,
	useRef,
	useState,
} from 'react';
import styles from './stackStrip.module.css';
import StackModal from '../stackModal/stackModal';
import { Tcategory } from '@/types/stack';
import UpArrowIcon from '@/components/interface/icons/upArrow';
import getClassName from '@/utils/getClassName';
import useProfileContext from '../hooks/useProfileContext';
import useOnBlur from '@/hooks/view/useOnBlur';

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
	const { expandedStripId, setExpandedStripId } = useProfileContext();

	console.log(expandedStripId);

	const isExpanded = expandedStripId === id;

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

	const expand = useCallback(
		() => setExpandedStripId(id),
		[id, setExpandedStripId]
	);
	const collapse = useCallback(
		() => (isExpanded ? setExpandedStripId('') : undefined),
		[isExpanded, setExpandedStripId]
	);
	const toggle = useCallback(
		() => (isExpanded ? collapse() : expand()),
		[collapse, expand, isExpanded]
	);

	const ref = useRef<HTMLDivElement | null>(null);

	useOnBlur(ref, collapse);

	return (
		<>
			<div
				className={styles.strip + getClassName(isExpanded, styles.isExpanded)}
				ref={ref}>
				<button
					className={styles.overlayButton}
					onMouseDown={toggle}
					onFocus={expand}>
					<span className={styles.icon}>
						<UpArrowIcon />
					</span>
				</button>
				<button
					className={styles.stackIcon}
					dangerouslySetInnerHTML={{ __html: icon || '?' }}
					onClick={handleModal}
				/>
				<div className={styles.stackInfo}>
					<div className={styles.stackTitle}>
						<h3>{name}</h3>
						<p>Less than 1 year</p>
					</div>
					<div className={styles.proficiencyContainer}>
						<div
							className={
								styles.proficiency + getClassName(score === 10, styles.full)
							}
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
						{isExpanded && <h5 className={styles.proficiencyText}>Beginner</h5>}
					</div>
				</div>
			</div>
		</>
	);
};

export default StackStrip;
