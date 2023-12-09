import { Tcategory } from '@/types/stack';
import Link from 'next/link';
import styles from './stackStrip.module.css';

interface StackStripProps {
	id: string;
	category: Tcategory;
	description: string;
	icon: string;
	link: string;
	name: string;
	requirements: string[];
}

const StackStrip = ({
	id,
	category,
	description,
	icon,
	link,
	name,
	requirements,
}: StackStripProps) => {
	return (
		<>
			<Link className={styles.stackStrip} href={`/s/${id}`}>
				<div
					className={styles.left}
					dangerouslySetInnerHTML={{ __html: icon || '?' }}
				/>
				<div className={styles.right}>
					<h3>{name}</h3>
					{description && <p className={styles.description}>{description}</p>}
				</div>
			</Link>
		</>
	);
};

export default StackStrip;
