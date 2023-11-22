import type { NextApiRequest, NextApiResponse } from 'next';
import { techChackDB } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '../../auth/[...nextauth]';
import { IUser, IUserStack } from '@/types/api/user';

const ALLOWED_METHODS = ['POST'];

/**
 * Updates a specified stack's score of the current user and return all stacks
 * in an array
 */
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<IUserStack[] | undefined>
) {
	const session = await getServerSession(req, res, nextAuthOptions);
	if (session) {
		const userId = req.query.userId as string;

		if (!ALLOWED_METHODS.includes(req.method!)) {
			res.status(405).end();
			return;
		}
		if (userId !== session.user.id) {
			res.status(401).end();
			return;
		}

		try {
			const { id: stackId, score: stackScore } = req.body;
			if (!stackId || !stackScore) {
				throw Error('You must provide a stack `ID` and `score`');
			}

			const user = await techChackDB
				.select()
				.from(users)
				.where(eq(users.id, userId))
				.get();

			if (!user) throw Error('User does not exist');

			const userStacks = user.stacks;
			const stackIndex = userStacks.findIndex((stack) => stack.id === stackId);
			userStacks.splice(stackIndex, 1, { id: stackId, score: stackScore });

			const newUser = {
				...user,
				stacks: userStacks,
			} satisfies IUser;

			const updatedUser = await techChackDB
				.update(users)
				.set(newUser)
				.where(eq(users.id, userId))
				.returning()
				.get();
			res.status(200).json(updatedUser.stacks);
		} catch (error: any) {
			res.status(error.code || 500).send(error);
		}
	} else {
		res.status(401);
	}
	res.end();
}
