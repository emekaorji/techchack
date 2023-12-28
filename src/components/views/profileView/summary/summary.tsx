import Avatar from '@/components/interface/avatar/avatar';
import styles from './summary.module.css';
import useAuthContext from '@/hooks/context/useAuthContext';

const ProfileSummary = () => {
	const { user } = useAuthContext();

	return (
		<>
			<div className={styles.summary}>
				<Avatar className={styles.avatar} url={user?.image} />
				<div className={styles.details}>
					<h2 className={styles.name}>
						<span>Emeka Orji</span>
						<span className={styles.pronoun}>• He/Him</span>
					</h2>
					<div className={styles.work}>
						<span className={styles.role}>Engineering Manager</span>
						<span className={styles.company}> at Polygon</span>
					</div>
					<div className={styles.description}>
						Meet Emeka Orji, a brilliant mind in the world of software
						engineering. With a passion for crafting elegant solutions to
						complex problems, he have honed his skills through years of hands-on
						experience. Whether it&apos;s designing scalable systems, writing
						efficient code, or troubleshooting intricate bugs, he bring a unique
						blend of creativity and technical expertise to every project. A
						lifelong learner, Emeka stays at the forefront of technological
						advancements, making him a valuable asset to any team. Beyond the
						screen, you might find him exploring the latest tech trends,
						contributing to open-source projects, or simply enjoying a good cup
						of coffee while contemplating the next big breakthrough in software
						engineering.
					</div>
				</div>
			</div>
		</>
	);
};

export default ProfileSummary;
