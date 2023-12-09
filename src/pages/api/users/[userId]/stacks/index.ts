import type { NextApiRequest, NextApiResponse } from 'next';
import { techChackDB } from '@/db';
import { publicUsers } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '../../../auth/[...nextauth]';
import { IPublicUser, IUserStack } from '@/types/user';

const ALLOWED_METHODS = ['GET', 'POST'];

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<IUserStack[]>
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

		try {
			let result: IUserStack[];
			if (req.method === 'GET') {
				result = await handleGetRequest(req);
			}
			if (req.method === 'POST') {
				result = await handlePostRequest(req);
			}
			res.status(200).json(result!);
		} catch (error: any) {
			res.status(500).send(error);
		}
	} else {
		res.status(401);
	}
	res.end();
}

/**
 * Returns a list of all the stacks for the specified user
 */
const handleGetRequest = async (req: NextApiRequest) => {
	const userId = req.query.userId as string;

	const user = await techChackDB
		.select()
		.from(publicUsers)
		.where(eq(publicUsers.id, userId))
		.get();

	if (!user)
		throw {
			code: 404,
			message: `User with ${'`ID:`'} ${userId} does not exist`,
		};

	const parsedStacks = user.stacks || [];

	return parsedStacks;
};

/**
 * Adds a new stack to the stack list of the specified user and returns a list
 * of all stacks for that user
 */
const handlePostRequest = async (req: NextApiRequest) => {
	const userId = req.query.userId as string;

	const { id: stackId } = req.body as IUserStack;
	if (!stackId)
		throw { code: 400, message: '`ID` must be specified in request body' };

	const user = await techChackDB
		.select()
		.from(publicUsers)
		.where(eq(publicUsers.id, userId))
		.get();

	if (!user)
		throw {
			code: 404,
			message: `User with ID: ${'`'}${userId}${'`'} does not exist`,
		};

	const userStacks = user.stacks || [];
	const existingStack = userStacks.find((stack) => stack.id === stackId);
	if (existingStack)
		throw {
			code: 409,
			message: 'Stack with that id already exists in user shelf',
		};
	userStacks.push({ id: stackId, score: 1 });

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

	return parsedStacks;
};
