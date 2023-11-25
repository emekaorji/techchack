import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '../auth/[...nextauth]';
import getAllStacks from '@/api/stacks/getAllStacks';
import { AllStacksResult } from '@/types/stack';

const ALLOWED_METHODS = ['GET'];

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<AllStacksResult>
) {
	if (!ALLOWED_METHODS.includes(req.method!)) {
		res.status(405).end();
		return;
	}
	const session = await getServerSession(req, res, nextAuthOptions);
	if (session) {
		const { limit, orderBy, page, search } = req.query as {
			[key: string]: string;
		};

		try {
			const allStacks = await getAllStacks(limit, orderBy, page, search);
			res.status(200).json(allStacks);
		} catch (error: any) {
			res.status(error.code || 500).send(error);
		}
	} else {
		res.status(401);
	}
	res.end();
}
