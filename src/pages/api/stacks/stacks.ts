// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { techChackDB } from '@/db';
import { stacks } from '@/db/schema';
import { Placeholder, SQL } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '../auth/[...nextauth]';

type Tcategory =
	| 'Languages'
	| 'Libraries & Frameworks'
	| 'Tools & Services'
	| 'Environments'
	| 'Concepts & Fields';
type SQLiteString = string | SQL<unknown> | Placeholder<string, any>;
interface IStack {
	id: SQLiteString;
	name: SQLiteString;
	description: SQLiteString;
	category: SQL<unknown> | Placeholder<string, any> | Tcategory;
	link: SQLiteString;
	requirements: string[] | SQL<unknown> | Placeholder<string, any>;
	icon: SQLiteString;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<IStack[]>
) {
	const session = await getServerSession(req, res, nextAuthOptions);
	if (session) {
		try {
			const allStack = await techChackDB.select().from(stacks).all();
			// console.log(allStack);
			res.status(200).json(allStack);
		} catch (error: any) {
			throw Error(error);
			// res.status(error.code || 500).send(error);
		}
	} else {
		res.status(401);
	}
	res.end();
}
