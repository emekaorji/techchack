import { useCallback, useEffect, useState } from 'react';
import LoaderIcon from '../icons/loader';
import styles from './avatar.module.css';
import getClassName from '@/utils/getClassName';

function testImageUrl(url = ''): Promise<string> {
	return new Promise(function (resolve, reject) {
		var image = new Image();
		image.src = url;
		image.addEventListener('load', () => resolve(url));
		image.addEventListener('error', reject);
	});
}

interface AvatarProps {
	className?: string;
	url?: string;
}

const Avatar = ({ className, url }: AvatarProps) => {
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
		<div className={styles.avatar + getClassName(className)}>
			<LoaderIcon />
		</div>
	) : actualUrl === null ? (
		''
	) : (
		<div className={styles.avatar + getClassName(className)}>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img src={actualUrl} alt='' />
		</div>
	);
};

export default Avatar;
