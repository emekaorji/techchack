import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '../auth/[...nextauth]';
import { IStack } from '@/types/stack';
import { techChackDB } from '@/db';
import { stacks } from '@/db/schema';
import { inArray } from 'drizzle-orm';

const ALLOWED_METHODS = ['GET'];

/**
 * Retrieves a list of all stacks based on the array of `ID`s specified in the
 * request body
 */
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<IStack[]>
) {
	// Request Validation Check
	if (!ALLOWED_METHODS.includes(req.method!)) {
		res.status(405).end();
		return;
	}

	// Authentication Check
	const session = await getServerSession(req, res, nextAuthOptions);
	if (!session) res.status(401);

	const { stackIds } = req.body as { stackIds: string[] };

	// Handle the request
	try {
		const multipleStacks = await techChackDB
			.select()
			.from(stacks)
			.where(inArray(stacks.id, stackIds));

		const parsedMultipleStacks = multipleStacks.map(
			(result) =>
				({
					category: result.category,
					description: result.description || '',
					icon: result.icon || '',
					id: result.id,
					link: result.link || '',
					name: result.name,
					requirements: result.requirements || [],
				} satisfies IStack)
		);

		res.status(200).json(parsedMultipleStacks);
	} catch (error: any) {
		res.status(error.code || 500).send(error);
	}
	res.end();
}
