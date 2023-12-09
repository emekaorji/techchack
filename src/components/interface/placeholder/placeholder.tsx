import { CSSProperties, useEffect, useState } from 'react';
import styles from './placeholder.module.css';

interface PlaceholderProps extends React.AllHTMLAttributes<HTMLDivElement> {
	background?: string;
	duration?: number;
	index?: number;
	randomize?: boolean;
}

const Placeholder = ({
	width = '100%',
	height = '3em',
	background = '#ffffff11',
	duration = 650,
	index = 0,
	randomize = false,
	...props
}: PlaceholderProps) => {
	const [randomDelay, setRandomDelay] = useState(0);

	useEffect(() => {
		let id = '';

		if (randomize) {
			// @ts-ignore
			id = setInterval(() => {
				setRandomDelay(Math.round(Math.random() * 50));
			}, duration);
		}

		if (!randomize) {
			clearInterval(id);
		}

		return () => {
			clearInterval(id);
		};
	}, [duration, randomize]);

	return (
		<>
			<div
				{...props}
				className={styles.placeholder}
				style={
					{
						'--width': width,
						'--height': height,
						'--background': background,
						'--duration': `${duration}ms`,
						'--delay': `${randomize ? randomDelay : index * 10}ms`,
					} as CSSProperties
				}
			/>
		</>
	);
};

export default Placeholder;
