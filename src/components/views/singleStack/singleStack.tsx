import { IStack } from '@/types/stack';
import Link from 'next/link';
import ExternalLinkIcon from '@/components/interface/icons/externalLink';
import InfoRoundIcon from '@/components/interface/icons/infoRound';
import StackNotFound from './notFound/notFound';
import styles from './singleStack.module.css';

interface SingleStackViewProps {
	stack: IStack | null;
}

const SingleStackView = ({ stack }: SingleStackViewProps) => {
	if (!stack) return <StackNotFound />;

	const { category, description, icon, id, link, name, requirements } = stack;

	return (
		<>
			<div className={styles.container}>
				<div className={styles.heading}>
					<div className={styles.headingIconContainer}>
						<Link
							className={styles.headingIcon}
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
				<section className={styles.section}>
					<h3>Roadmap</h3>
					<p>
						[If this stack is a language, show a diagram of the roadmap to
						learning it.]
					</p>
				</section>
			</div>
		</>
	);
};

export default SingleStackView;
