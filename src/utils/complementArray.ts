export default function complementArray<T>(
	primeArray: T[],
	filterArray: Partial<T>[],
	key?: string
): T[] {
	const keys = key?.split('.');
	const filteredArray = primeArray.filter(
		(item1) =>
			!filterArray.some((item2) => {
				if (keys) {
					let res1: any, res2: any;
					keys.forEach((_key) => {
						res1 = (item1 as { [key: string]: any })[_key];
						res2 = (item2 as { [key: string]: any })[_key];
					});
					return res1 === res2;
				} else {
					return item2 === item1;
				}
			})
	);
	return filteredArray;
}
