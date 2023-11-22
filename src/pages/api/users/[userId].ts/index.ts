import type { NextApiRequest, NextApiResponse } from 'next';
import { techChackDB } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '../../auth/[...nextauth]';
import { IUser } from '@/types/api/user';

const ALLOWED_METHODS = ['POST', 'GET'];

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<IUser | undefined>
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

		if (req.method === 'POST') {
			handlePostRequest(req, res);
		}
		if (req.method === 'GET') {
			handleGetRequest(req, res);
		}
	} else {
		res.status(401);
	}
	res.end();
}

const handlePostRequest = async (req: NextApiRequest, res: NextApiResponse) => {
	const userId = req.query.userId as string;

	const body = req.body;

	try {
		const user = await techChackDB
			.select()
			.from(users)
			.where(eq(users.id, userId))
			.get();

		if (!user) throw Error('User does not exist');

		const newUser = {
			...user,
			name: body.name || user.name,
			role: body.role || user.role,
		} satisfies IUser;

		const updatedUser = await techChackDB
			.update(users)
			.set(newUser)
			.where(eq(users.id, userId))
			.returning()
			.get();
		res.status(200).json(updatedUser);
	} catch (error: any) {
		res.status(error.code || 500).send(error);
	}
};

const handleGetRequest = async (req: NextApiRequest, res: NextApiResponse) => {
	const userId = req.query.userId as string;

	try {
		const user = await techChackDB
			.select()
			.from(users)
			.where(eq(users.id, userId))
			.get();
		res.status(200).json(user);
	} catch (error: any) {
		res.status(error.code || 500).send(error);
	}
};
