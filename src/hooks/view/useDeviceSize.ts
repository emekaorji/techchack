import { useEffect, useState } from 'react';

const useDeviceSize = (): [width: number, height: number] => {
	const [size, setSize] = useState({
		width: 0,
		height: 0,
	});

	useEffect(() => {
		const observer = new ResizeObserver((entries) => {
			const documentElement = entries[0];
			const _width = documentElement.contentRect.width;
			const _height = documentElement.contentRect.height;
			setSize({ width: _width, height: _height });
		});

		observer.observe(document.documentElement);

		return () => {
			observer.disconnect();
			observer.unobserve(document.documentElement);
		};
	}, []);

	return [size.width, size.height];
};

export default useDeviceSize;
