import { techChackDB } from '@/db';
import { stacks } from '@/db/schema';
import { AllStacksResult } from '@/types/api/stack';
import { asc, desc } from 'drizzle-orm';

const LIMIT = 100;

export default async function getAllStacks(
	orderBy = 'asc',
	page: string | number = 1,
	search = ''
): Promise<AllStacksResult> {
	const order =
		orderBy === 'asc'
			? asc(stacks.name)
			: orderBy === 'desc'
			? desc(stacks.name)
			: asc(stacks.name);
	const parsedPageNumber = Number(page) || 1;
	const pageOffset = (parsedPageNumber - 1) * LIMIT;
	const results = await techChackDB
		.select()
		.from(stacks)
		.orderBy(order)
		.limit(LIMIT)
		.offset(pageOffset)
		.all();

	return {
		results,
		page: parsedPageNumber,
		limit: LIMIT,
		orderBy,
	};
}
