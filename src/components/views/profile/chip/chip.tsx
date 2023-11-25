import { useCallback, useState } from 'react';
import InfoIcon from '../../../interface/icons/info';
import useProfileContext from '../hooks/useProfileContext';
import styles from './chip.module.css';
import getClassName from '@/utils/getClassName';

interface ChipProps {
	icon: string;
	id: string;
	name: string;
}

const Chip = ({ id, icon, name }: ChipProps) => {
	const { addStack } = useProfileContext();

	const [loading, setLoading] = useState(false);

	const handleAddStack = useCallback(async () => {
		try {
			setLoading(true);
			await addStack(id);
		} catch (error: any) {
			console.error(error);
		}
		setLoading(false);
	}, [addStack, id]);

	return (
		<>
			<div className={styles.chipContainer}>
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
					<button className={styles.infoButton}>
						<InfoIcon />
					</button>
					<span className={styles.name}>{name}</span>
					<button className={styles.overlayButton} onClick={handleAddStack} />
				</div>
			</div>
		</>
	);
};

export default Chip;
