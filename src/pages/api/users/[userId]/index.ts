import type { NextApiRequest, NextApiResponse } from 'next';
import { techChackDB } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '../../auth/[...nextauth]';
import { IUser } from '@/types/user';

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
	if (session && session.user) {
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
					company: user.company || '',
					description: user.description || '',
					githubUrl: user.githubUrl || '',
					interests: user.interests || '',
					joinedDate: user.joinedDate || null,
					linkedinUrl: user.linkedinUrl || '',
					location: user.location || '',
					phone: user.phone || '',
					pronouns: user.pronouns || '',
					publicFields: user.publicFields || [],
					role: user.role || '',
					stacks: user.stacks || [],
					twitterUrl: user.twitterUrl || '',
			  } satisfies IUser)
			: undefined;

		res.status(200).json(parsedUser);
	} catch (error: any) {
		res.status(500).send(error);
	}
};

const handlePatchRequest = async (
	req: NextApiRequest,
	res: NextApiResponse<IUser>
) => {
	const userId = req.query.userId as string;

	const { name, role, image } = JSON.parse(req.body) as Partial<IUser>;

	try {
		const user = await techChackDB
			.select()
			.from(users)
			.where(eq(users.id, userId))
			.get();

		if (!user) throw Error('User does not exist');

		const updatedUserFields = {
			name: name || user.name || '',
			image: image || user.image || '',
		} satisfies Partial<IUser>;

		const updatedUser = await techChackDB
			.update(users)
			.set(updatedUserFields)
			.where(eq(users.id, userId))
			.returning()
			.get();

		const parsedUpdatedUser = {
			id: updatedUser.id,
			name: updatedUser.name || '',
			email: updatedUser.email || '',
			image: updatedUser.image || '',
			role: updatedUser.role || '',
			stacks: updatedUser.stacks || [],
			company: updatedUser.company || '',
			description: updatedUser.description || '',
			githubUrl: updatedUser.githubUrl || '',
			interests: updatedUser.interests || '',
			joinedDate: updatedUser.joinedDate || null,
			linkedinUrl: updatedUser.linkedinUrl || '',
			location: updatedUser.location || '',
			phone: updatedUser.phone || '',
			pronouns: updatedUser.pronouns || '',
			publicFields: updatedUser.publicFields || [],
			twitterUrl: updatedUser.twitterUrl || '',
		} satisfies IUser;

		res.status(200).json(parsedUpdatedUser);
	} catch (error: any) {
		res.status(500).send(error);
	}
};
