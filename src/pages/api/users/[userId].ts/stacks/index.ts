import type { NextApiRequest, NextApiResponse } from 'next';
import { techChackDB } from '@/db';
import { publicUsers } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '../../../auth/[...nextauth]';
import { IPublicUser, IUserStack } from '@/types/api/user';

const ALLOWED_METHODS = ['GET', 'POST'];

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

		if (req.method === 'GET') {
			handleGetRequest(req, res);
		}
		if (req.method === 'POST') {
			handlePostRequest(req, res);
		}
	} else {
		res.status(401);
	}
	res.end();
}

/**
 * Returns a list of all the stacks for the specified user
 */
const handleGetRequest = async (
	req: NextApiRequest,
	res: NextApiResponse<IUserStack[] | undefined>
) => {
	const userId = req.query.userId as string;

	try {
		const user = await techChackDB
			.select()
			.from(publicUsers)
			.where(eq(publicUsers.id, userId))
			.get();

		if (!user) throw Error('User does not exist');

		const parsedStacks = user.stacks || [];

		res.status(200).json(parsedStacks);
	} catch (error: any) {
		res.status(error.code || 500).send(error);
	}
};

/**
 * Adds a new stack to the stack list of the specified user and returns a list
 * of all stacks for that user
 */
const handlePostRequest = async (
	req: NextApiRequest,
	res: NextApiResponse<IUserStack[] | undefined>
) => {
	const userId = req.query.userId as string;

	try {
		const { id: stackId } = JSON.parse(req.body) as IUserStack;
		if (!stackId) throw Error('`ID` must be specified in request body');

		const user = await techChackDB
			.select()
			.from(publicUsers)
			.where(eq(publicUsers.id, userId))
			.get();

		if (!user) throw Error('User does not exist');

		const userStacks = user.stacks || [];
		userStacks.push({ id: stackId, score: 5 });

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
