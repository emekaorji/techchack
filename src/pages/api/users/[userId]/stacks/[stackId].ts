import type { NextApiRequest, NextApiResponse } from 'next';
import { techChackDB } from '@/db';
import { publicUsers } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '../../../auth/[...nextauth]';
import { IPublicUser, IUserStack } from '@/types/user';

const ALLOWED_METHODS = ['DELETE', 'PATCH'];

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (!ALLOWED_METHODS.includes(req.method!)) {
		res.status(405).end();
		return;
	}
	const session = await getServerSession(req, res, nextAuthOptions);
	if (session) {
		const userId = req.query.userId as string;

		if (userId !== session.user.id) {
			res.status(401).end();
			return;
		}

		if (req.method === 'DELETE') {
			handleDeleteRequest(req, res);
		}
		if (req.method === 'PATCH') {
			handlePatchRequest(req, res);
		}
	} else {
		res.status(401);
	}
	res.end();
}

/**
 * Removes the specified stack from the specified user and returns a list of
 * all remaining stacks
 */
const handleDeleteRequest = async (
	req: NextApiRequest,
	res: NextApiResponse<IUserStack[] | undefined>
) => {
	const userId = req.query.userId as string;
	const stackId = req.query.stackId as string;

	try {
		const user = await techChackDB
			.select()
			.from(publicUsers)
			.where(eq(publicUsers.id, userId))
			.get();

		if (!user) throw Error('User does not exist');

		const userStacks = user.stacks || [];
		const stackIndex = userStacks.findIndex((stack) => stack.id === stackId);
		if (stackIndex < 0) throw Error('User does not have a stack with that ID');
		userStacks.splice(stackIndex, 1);

		const updatedUserFields = {
			stacks: userStacks,
		} satisfies Partial<IPublicUser>;

		const updatedUser = await techChackDB
			.update(publicUsers)
			.set(updatedUserFields)
			.where(eq(publicUsers.id, userId))
			.returning()
			.get();

		const parsedStacks = updatedUser.stacks || [];

		res.status(200).json(parsedStacks);
	} catch (error: any) {
		res.status(error.code || 500).send(error);
	}
};

/**
 * Updates a specified stack's score of the specified user and return all stacks
 * in an array
 */
const handlePatchRequest = async (
	req: NextApiRequest,
	res: NextApiResponse<IUserStack[] | undefined>
) => {
	const userId = req.query.userId as string;
	const stackId = req.query.stackId as string;

	try {
		const { score: stackScore } = JSON.parse(req.body);
		if (!stackScore) {
			throw Error('`score` must be specified in request body');
		}

		const user = await techChackDB
			.select()
			.from(publicUsers)
			.where(eq(publicUsers.id, userId))
			.get();

		if (!user) throw Error('User does not exist');

		const userStacks = user.stacks || [];
		const stackIndex = userStacks.findIndex((stack) => stack.id === stackId);
		if (stackIndex < 0) throw Error('User does not have a stack with that ID');
		userStacks.splice(stackIndex, 1, { id: stackId, score: stackScore });

		const updatedUserFields = {
			stacks: userStacks,
		} satisfies Partial<IPublicUser>;

		const updatedUser = await techChackDB
			.update(publicUsers)
			.set(updatedUserFields)
			.where(eq(publicUsers.id, userId))
			.returning()
			.get();

		const parsedStacks = updatedUser.stacks || [];

		res.status(200).json(parsedStacks);
	} catch (error: any) {
		res.status(error.code || 500).send(error);
	}
};
