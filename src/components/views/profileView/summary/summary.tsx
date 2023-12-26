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
						<span className={styles.role}>Software Engineer</span>
						<span className={styles.company}> at Polygon</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProfileSummary;
