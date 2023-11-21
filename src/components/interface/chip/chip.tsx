import InfoIcon from '../icons/info';
import styles from './chip.module.css';

interface ChipProps {
	icon: string;
	name: string;
}

const Chip = ({ icon, name }: ChipProps) => {
	return (
		<>
			<div className={styles.chip}>
				<span
					className={styles.icon}
					dangerouslySetInnerHTML={{ __html: icon }}
				/>
				<button className={styles.infoButton}>
					<InfoIcon />
				</button>
				<span className={styles.name}>{name}</span>
				<button className={styles.overlayButton} />
			</div>
		</>
	);
};

export default Chip;
