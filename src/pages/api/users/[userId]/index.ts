import type { NextApiRequest, NextApiResponse } from 'next';
import { techChackDB } from '@/db';
import { publicUsers, users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '../../auth/[...nextauth]';
import { IPublicUser, IUser } from '@/types/api/user';

const ALLOWED_METHODS = ['GET', 'PATCH'];

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
		if (req.method === 'PATCH') {
			handlePatchRequest(req, res);
		}
	} else {
		res.status(401);
	}
	res.end();
}

const handleGetRequest = async (
	req: NextApiRequest,
	res: NextApiResponse<IUser | undefined>
) => {
	const userId = req.query.userId as string;

	try {
		const user = await techChackDB
			.select()
			.from(users)
			.where(eq(users.id, userId))
			.get();

		const parsedUser = user
			? ({
					id: user.id,
					name: user.name || '',
					email: user.email || '',
					image: user.image || '',
			  } satisfies IUser)
			: undefined;

		res.status(200).json(parsedUser);
	} catch (error: any) {
		res.status(error.code || 500).send(error);
	}
};

const handlePatchRequest = async (
	req: NextApiRequest,
	res: NextApiResponse<IPublicUser>
) => {
	const userId = req.query.userId as string;

	const { name, role, image } = JSON.parse(req.body) as Partial<IPublicUser>;

	try {
		const user = await techChackDB
			.select()
			.from(publicUsers)
			.where(eq(publicUsers.id, userId))
			.get();

		if (!user) throw Error('User does not exist');

		const updatedUserFields = {
			name: name || user.name || '',
			image: image || user.image || '',
		} satisfies Partial<IUser>;
		const updatedPublicUserFields = {
			...updatedUserFields,
			role: role || user.role || '',
		} satisfies Partial<IPublicUser>;

		const userUpdater = techChackDB
			.update(users)
			.set(updatedUserFields)
			.where(eq(users.id, userId))
			.returning()
			.get();
		const publicUserUpdater = techChackDB
			.update(publicUsers)
			.set(updatedPublicUserFields)
			.where(eq(publicUsers.id, userId))
			.returning()
			.get();
		const updatedPublicUser = (
			await Promise.all([userUpdater, publicUserUpdater])
		)[1];

		const parsedUpdatedPublicUser = {
			id: updatedPublicUser.id,
			name: updatedPublicUser.name || '',
			email: updatedPublicUser.email || '',
			image: updatedPublicUser.image || '',
			role: updatedPublicUser.role || '',
			stacks: updatedPublicUser.stacks || [],
		} satisfies IPublicUser;

		res.status(200).json(parsedUpdatedPublicUser);
	} catch (error: any) {
		res.status(error.code || 500).send(error);
	}
};
