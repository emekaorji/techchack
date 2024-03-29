import { Tcategory } from '@/types/stack';
import styles from './stackModal.module.css';
import ExternalLinkIcon from '@/components/interface/icons/externalLink';
import InfoRoundIcon from '@/components/interface/icons/infoRound';
import Link from 'next/link';

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
						<Link
							className={styles.modalIcon}
							dangerouslySetInnerHTML={{ __html: icon || '?' }}
							href={`/s/${id}`}
						/>
					</div>
					<h5 className={styles.category}>{category}</h5>
					<Link className={styles.title} href={`/s/${id}`}>
						{name}
					</Link>
				</div>
				<section className={styles.section}>
					<h3>Overview</h3>
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
					<h3>
						Resources
						<span>(The following links will open in an external tab)</span>
					</h3>
					<ul>
						<li>
							<a
								href='http://google.com'
								target='_blank'
								rel='noopener noreferrer'>
								Here is a link to a resource
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
								Here is a link to more resource
								<span className={styles.icon}>
									<ExternalLinkIcon />
								</span>
							</a>
						</li>
					</ul>
				</section>
				<section className={styles.section}>
					<h3>
						Requirements
						<span
							className={styles.icon}
							title='Basic things to have to claim you have knowledge of this stack'>
							<InfoRoundIcon />
						</span>
					</h3>
					<p>To have knowledge of this stack, you need know the following:</p>
					<ul>
						<li>Syntax</li>
						<li>Data Types</li>
						<li>Arrays & Objects and their methods</li>
						<li>DOM Manipulation</li>
					</ul>
				</section>
				<br />
				<Link className={styles.moreLink} href={`/s/${id}`}>
					See more..
				</Link>
			</div>
		</>
	);
};

export default StackModal;
