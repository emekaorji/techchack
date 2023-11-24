import type { NextApiRequest, NextApiResponse } from 'next';
import { techChackDB } from '@/db';
import { stacks } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '../auth/[...nextauth]';
import { IStack } from '@/types/stack';

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
	res: NextApiResponse<IStack | undefined>
) => {
	const stackId = req.query.stackId as string;

	try {
		const stack = await techChackDB
			.select()
			.from(stacks)
			.where(eq(stacks.id, stackId))
			.get();

		const parsedStack = stack
			? ({
					category: stack.category,
					description: stack.description || '',
					icon: stack.icon || '',
					id: stack.id,
					link: stack.link || '',
					name: stack.name,
					requirements: stack.requirements || [],
			  } satisfies IStack)
			: undefined;

		res.status(200).json(parsedStack);
	} catch (error: any) {
		res.status(error.code || 500).send(error);
	}
};

const handlePatchRequest = async (
	req: NextApiRequest,
	res: NextApiResponse<IStack>
) => {
	const stackId = req.query.stackId as string;

	const { category, description, icon, link, name, requirements } = req.body;

	try {
		const stack = await techChackDB
			.select()
			.from(stacks)
			.where(eq(stacks.id, stackId))
			.get();

		if (!stack) throw Error('Stack with that `ID` does not exist');

		const updatedFields = {
			category: category || stack.category,
			description: description || stack.description,
			icon: icon || stack.icon,
			link: link || stack.link,
			name: name || stack.name,
			requirements: requirements || stack.requirements,
		} satisfies Partial<IStack>;
		const newStack = {
			...stack,
			...updatedFields,
		} satisfies IStack;

		const updatedStack = await techChackDB
			.update(stacks)
			.set(newStack)
			.where(eq(stacks.id, stackId))
			.returning()
			.get();

		const parsedStack = {
			category: updatedStack.category,
			description: updatedStack.description || '',
			icon: updatedStack.icon || '',
			id: updatedStack.id,
			link: updatedStack.link || '',
			name: updatedStack.name,
			requirements: updatedStack.requirements || [],
		} satisfies IStack;

		res.status(200).json(parsedStack);
	} catch (error: any) {
		res.status(error.code || 500).send(error);
	}
};
