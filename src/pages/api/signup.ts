import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcryptjs';
import MongoClient from '@/db/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST')
		return res.status(405).json({ error: 'Method Not Allowed' });
	if (!req.body) return res.status(400).json({ error: 'Data is missing' });

	const { fullName, email, password } = req.body;

	const client = await MongoClient;
	const teckchackDB = client.db('techchack');
	const usersCollection = teckchackDB.collection('users');
	const userExists = await usersCollection.findOne({ email });

	if (userExists) return res.status(409).json({ error: 'User Already exists' });
	if (password.length < 6)
		return res
			.status(409)
			.json({ error: 'Password should be 6 characters long' });

	const hashedPassword = await hash(password, 12);

	const data = await usersCollection.insertOne({
		fullName,
		email,
		password: hashedPassword,
	});

	const user = {
		email: email,
		fullName: fullName,
		_id: data.insertedId,
	};

	return res.status(201).json(user);
};

export default handler;
