import { techChackDB } from '@/db';
import { stacks } from '@/db/schema';
import { AllStacksResult, IStack, IPagination } from '@/types/stack';
import { SQL, asc, desc, like, sql } from 'drizzle-orm';

function getOrder(orderBy: string): SQL<unknown> {
	return orderBy === 'asc'
		? asc(stacks.name)
		: orderBy === 'desc'
		? desc(stacks.name)
		: asc(stacks.name);
}

function getParsedParams(
	orderBy: string,
	pageNumber: string,
	limit: string
): {
	order: SQL<unknown>;
	parsedPageNumber: number;
	parsedLimit: number;
	parsedPageOffset: number;
} {
	const order = getOrder(orderBy);
	const parsedPageNumber = Number(pageNumber) || 1;
	const parsedLimit = Number(limit) || 100;
	const parsedPageOffset = (parsedPageNumber - 1) * parsedLimit;

	return {
		order,
		parsedPageNumber,
		parsedLimit,
		parsedPageOffset,
	};
}

function getPagination(
	countResults: {
		count: number;
	}[],
	pageNumber: number,
	limit: number,
	orderBy: string
) {
	const count = countResults[0].count;
	const pageCount = Math.ceil(count / limit);

	const pagination = {
		pageNumber,
		limit,
		orderBy,
		total: count,
		pageCount,
	} satisfies IPagination;

	return pagination;
}

function getStackPromiseBasedOnSearch(
	limit: number,
	order: SQL<unknown>,
	pageOffset: number,
	search = ''
) {
	return search
		? techChackDB
				.select()
				.from(stacks)
				.where(like(stacks.name, `%${search}%`))
				.orderBy(order)
				.limit(limit)
				.offset(pageOffset)
				.all()
		: techChackDB
				.select()
				.from(stacks)
				.orderBy(order)
				.limit(limit)
				.offset(pageOffset)
				.all();
}

function getCountPromiseBasedOnSearch(search = '') {
	return search
		? techChackDB
				.select({ count: sql<number>`count(*)` })
				.from(stacks)
				.where(like(stacks.name, `%${search}%`))
		: techChackDB.select({ count: sql<number>`count(*)` }).from(stacks);
}

export default async function getAllStacks(
	limit = '100',
	orderBy = 'asc',
	page = '1',
	search = ''
): Promise<AllStacksResult> {
	const { order, parsedLimit, parsedPageNumber, parsedPageOffset } =
		getParsedParams(orderBy, page, limit);

	const stacksPromise = getStackPromiseBasedOnSearch(
		parsedLimit,
		order,
		parsedPageOffset,
		search
	);
	const countPromise = getCountPromiseBasedOnSearch(search);

	const results = await Promise.all([stacksPromise, countPromise]);
	const parsedResults = results[0].map(
		(result) =>
			({
				category: result.category,
				description: result.description || '',
				icon: result.icon || '',
				id: result.id,
				link: result.link || '',
				name: result.name,
				requirements: result.requirements || [],
				creators: result.creators || [],
				releaseDate: result.releaseDate || null,
				shortDescription: result.shortDescription || '',
			} satisfies IStack)
	);

	const pagination = getPagination(
		results[1],
		parsedPageNumber,
		parsedLimit,
		orderBy
	);

	return {
		results: parsedResults,
		pagination,
	};
}
