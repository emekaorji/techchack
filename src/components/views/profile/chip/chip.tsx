import InfoIcon from '../../../interface/icons/info';
import styles from './chip.module.css';

interface ChipProps {
	icon: string | null;
	name: string;
}

const Chip = ({ icon, name }: ChipProps) => {
	return (
		<>
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
				<button className={styles.overlayButton} />
			</div>
		</>
	);
};

export default Chip;
