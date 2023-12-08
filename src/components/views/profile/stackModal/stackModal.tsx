import { Tcategory } from '@/types/stack';
import styles from './stackModal.module.css';

interface StackModalProps {
	icon: string;
	id: string;
	name: string;
	category: Tcategory;
	description: string;
	link: string;
	requirements: string[];
}

const StackModal = ({
	id,
	category,
	description,
	icon,
	link,
	name,
	requirements,
}: StackModalProps) => {
	return (
		<>
			<div className={styles.stackModal}>
				<div className={styles.heading}>
					<div className={styles.modalIconContainer}>
						<div
							className={styles.modalIcon}
							dangerouslySetInnerHTML={{ __html: icon || '?' }}
						/>
					</div>
					<h5 className={styles.category}>{category}</h5>
					<h2>{name}</h2>
					<p>{description}</p>
				</div>
			</div>
		</>
	);
};

export default StackModal;
