import XMarkSharpIcon from '../icons/xMarkSharp';
import styles from './chip.module.css';

interface ChipProps {
	icon: string;
	name: string;
}

const Chip = ({ icon, name }: ChipProps) => {
	return (
		<>
			<div className={styles.chip}>
				<span className={styles.icon}>{icon}</span>
				<span className={styles.name}>{name}</span>
				<button className={styles.overlayButton} />
				<button className={styles.cancelButton}>
					<XMarkSharpIcon />
				</button>
			</div>
		</>
	);
};

export default Chip;
