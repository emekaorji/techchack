import { Tcategory } from '@/types/stack';
import styles from './stackModal.module.css';
import ExternalLinkIcon from '@/components/interface/icons/externalLink';

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
					{/* <p>{description}</p> */}
				</div>
				<section className={styles.section}>
					<h4>Overview</h4>
					<p>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste quos
						voluptatem officiis nihil! Eum laborum non iusto vero ipsum numquam
						quod veritatis nesciunt in similique praesentium, soluta atque nam
						voluptatum? Lorem ipsum dolor sit, amet consectetur adipisicing
						elit. Iste quos voluptatem officiis nihil! Eum laborum non iusto
						vero ipsum numquam quod veritatis nesciunt in similique praesentium,
						soluta atque nam voluptatum?
					</p>
				</section>
				<section className={styles.section}>
					<h4>
						Resources{' '}
						<span>(The following links will open in an external window)</span>
					</h4>
					<ul>
						<li>
							<a
								href='http://google.com'
								target='_blank'
								rel='noopener noreferrer'>
								Here is a link to more resource{' '}
								<span className={styles.icon}>
									<ExternalLinkIcon />
								</span>
							</a>
						</li>
						<li>
							<a
								href='http://google.com'
								target='_blank'
								rel='noopener noreferrer'>
								Here is a link to more resource{' '}
								<span className={styles.icon}>
									<ExternalLinkIcon />
								</span>
							</a>
						</li>
					</ul>
				</section>
			</div>
		</>
	);
};

export default StackModal;
