// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { techChackDB } from '@/db';
import { stacks } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '../auth/[...nextauth]';
import { IServerStack } from '@/types/api/stack';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<IServerStack | undefined>
) {
	const session = await getServerSession(req, res, nextAuthOptions);
	if (session) {
		const stackId = req.query.stackId as string;

		try {
			const newStack = await techChackDB
				.select()
				.from(stacks)
				.where(eq(stacks.id, stackId))
				.get();
			// console.log(newStack);
			res.status(200).json(newStack);
		} catch (error: any) {
			throw Error(error);
			// res.status(error.code || 500).send(error);
		}
	} else {
		res.status(401);
	}
	res.end();
}
