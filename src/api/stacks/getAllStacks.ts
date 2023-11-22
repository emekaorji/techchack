import { techChackDB } from '@/db';
import { stacks } from '@/db/schema';
import { AllStacksResult, Pagination } from '@/types/api/stack';
import { asc, desc, like, sql } from 'drizzle-orm';

function getOrder(orderBy: string) {
	return orderBy === 'asc'
		? asc(stacks.name)
		: orderBy === 'desc'
		? desc(stacks.name)
		: asc(stacks.name);
}

function getParsedParams(orderBy: string, pageNumber: string, limit: string) {
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
	} satisfies Pagination;

	return pagination;
}

async function getNormalResults(
	orderBy: string,
	limit: string,
	pageNumber: string
) {
	const { order, parsedLimit, parsedPageNumber, parsedPageOffset } =
		getParsedParams(orderBy, pageNumber, limit);

	const stacksPromise = techChackDB
		.select()
		.from(stacks)
		.orderBy(order)
		.limit(parsedLimit)
		.offset(parsedPageOffset)
		.all();
	const countPromise = techChackDB
		.select({ count: sql<number>`count(*)` })
		.from(stacks);

	const results = await Promise.all([stacksPromise, countPromise]);

	const pagination = getPagination(
		results[1],
		parsedPageNumber,
		parsedLimit,
		orderBy
	);

	return {
		results: results[0],
		pagination,
	};
}

async function getSearchResults(
	search: string,
	orderBy: string,
	limit: string,
	pageNumber: string
) {
	const { order, parsedLimit, parsedPageNumber, parsedPageOffset } =
		getParsedParams(orderBy, pageNumber, limit);

	const stacksPromise = techChackDB
		.select()
		.from(stacks)
		.where(like(stacks.name, `%${search}%`))
		.orderBy(order)
		.limit(parsedLimit)
		.offset(parsedPageOffset)
		.all();
	const countPromise = techChackDB
		.select({ count: sql<number>`count(*)` })
		.from(stacks)
		.where(like(stacks.name, `%${search}%`));

	const results = await Promise.all([stacksPromise, countPromise]);

	const pagination = getPagination(
		results[1],
		parsedPageNumber,
		parsedLimit,
		orderBy
	);

	return {
		results: results[0],
		pagination,
	};
}

export default async function getAllStacks(
	limit = '100',
	orderBy = 'asc',
	page = '1',
	search = ''
): Promise<AllStacksResult> {
	console.log('search', search);

	const results = search
		? await getSearchResults(search, orderBy, limit, page)
		: await getNormalResults(orderBy, limit, page);

	return {
		results: results.results,
		pagination: results.pagination,
	};
}
