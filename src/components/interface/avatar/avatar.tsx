import { useCallback, useEffect, useState } from 'react';
import LoaderIcon from '../icons/loader';
import styles from './avatar.module.css';

function testImageUrl(url = ''): Promise<string> {
	return new Promise(function (resolve, reject) {
		var image = new Image();
		image.src = url;
		image.addEventListener('load', () => resolve(url));
		image.addEventListener('error', reject);
	});
}

const Avatar = ({ url }: { url?: string }) => {
	const [actualUrl, setActualUrl] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const handleImage = useCallback(async () => {
		try {
			setLoading(true);
			const _actualUrl = await testImageUrl(url);
			setActualUrl(_actualUrl);
		} catch (error) {
			setActualUrl(null);
		}
		setLoading(false);
	}, [url]);

	useEffect(() => {
		handleImage();
	}, [handleImage]);

	return loading ? (
		<div className={styles.avatar}>
			<LoaderIcon />
		</div>
	) : actualUrl === null ? (
		''
	) : (
		<div className={styles.avatar}>
			<img src={actualUrl} alt='' />
		</div>
	);
};

export default Avatar;
