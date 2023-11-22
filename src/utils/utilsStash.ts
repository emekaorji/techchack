export const getBase64FromUrl = async (url: string) => {
	const data = await fetch(url);
	const blob = await data.blob();
	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.readAsDataURL(blob);
		reader.onloadend = () => {
			const base64data = reader.result;
			resolve(base64data);
		};
	});
};

export const convertSVGtoDataURL = async (svgPath: string): Promise<string> => {
	try {
		const response = await fetch(svgPath);
		const result = await response.text();
		console.log(result);
	} catch (error) {
		console.log(error);
	}
	return '';
};
