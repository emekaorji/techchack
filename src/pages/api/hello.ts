// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import fsPromises from 'fs/promises';
import path from 'path';

function getExtension(filename: string) {
	return filename.split('.').pop() || '';
}

export async function batchUploadToMongo() {
	const jsonFilePath = path.join(process.cwd(), 'src/data/stacks.json');
	const jsonData = await fsPromises.readFile(jsonFilePath, 'utf8');
	const jsonObjectData = JSON.parse(jsonData) as {
		name: string;
		icon: string;
	}[];
	console.log(jsonObjectData);
	let count = 227;
	// const length = jsonObjectData.length;
	const length = 227 + 4;
	while (count < length) {
		const item = jsonObjectData[count];
		console.log('================================');
		console.log(`Uploading: ${item.name}`);

		const extension = getExtension(item.icon);
		const iconFilePath = path.join(
			process.cwd(),
			`src/assets/icons/${item.icon}`
		);
		if (extension === 'svg') {
			// Encode UTF8 string and push the string to mongodb
			const iconData = await fsPromises.readFile(iconFilePath, 'utf8');
			const documentData = {
				name: item.name,
				icon: iconData,
			};
			console.log(documentData);
		} else {
			// i.e if `png` or `jpg`
			// Encode Base64 string, wrap it in an svg `image` and push the string to mongodb
			const iconData = await fsPromises.readFile(iconFilePath, 'base64');
			const modifiedIconData = `<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg"><image style="width: 100%; height: 100%;" href="data:image/${extension};base64,${iconData}" /></svg>`;
			const documentData = {
				name: item.name,
				icon: modifiedIconData,
			};
			console.log(documentData);
		}

		console.log('File Type: ' + extension.toUpperCase());
		console.log(`Uploaded: ${item.name}`);
		console.log('================================');
		count++;
	}
}

type Data = {
	name: string;
};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	batchUploadToMongo();
	res.status(200).json({ name: 'John Doe' });
}
