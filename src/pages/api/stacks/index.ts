import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '../auth/[...nextauth]';
import getAllStacks from '@/api/stacks/getAllStacks';
import { AllStacksResult } from '@/types/stack';

interface Query {
	perPage: string;
	order: 'asc' | 'desc';
	page: string;
	search: string;
}

const ALLOWED_METHODS = ['GET'];

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<AllStacksResult>
) {
	// Request Validation Check
	if (!ALLOWED_METHODS.includes(req.method!)) {
		res.status(405).end();
		return;
	}

	// Authentication Check
	const session = await getServerSession(req, res, nextAuthOptions);
	if (!session) res.status(401);

	// Parse the query parameters
	const { perPage, order, page, search } = req.query as Partial<Query>;

	// Handle the request
	try {
		const allStacks = await getAllStacks(perPage, order, page, search);
		res.status(200).json(allStacks);
	} catch (error: any) {
		res.status(500).send(error);
	}
	res.end();
}
