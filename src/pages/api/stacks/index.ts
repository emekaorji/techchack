import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '../auth/[...nextauth]';
import { AllStacksResult } from '@/types/api/stack';
import getAllStacks from '@/api/stacks/getAllStacks';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<AllStacksResult>
) {
	const session = await getServerSession(req, res, nextAuthOptions);
	if (session) {
		const { orderBy, page, search } = req.query as { [key: string]: string };

		try {
			const allStacks = await getAllStacks(orderBy, page, search);
			res.status(200).json(allStacks);
		} catch (error: any) {
			throw Error(error);
			// res.status(error.code || 500).send(error);
		}
	} else {
		res.status(401);
	}
	res.end();
}
