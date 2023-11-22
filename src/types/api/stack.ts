import { Placeholder, SQL } from 'drizzle-orm';
import { IStack, Tcategory } from '../stack';

type SQLiteString = string | SQL<unknown> | Placeholder<string, any>;

export interface IServerStack {
	id: SQLiteString;
	name: SQLiteString;
	description: SQLiteString;
	category: SQL<unknown> | Placeholder<string, any> | Tcategory;
	link: SQLiteString;
	requirements: string[] | SQL<unknown> | Placeholder<string, any>;
	icon: SQLiteString;
}

export interface Pagination {
	limit: number;
	orderBy: string;
	pageNumber: number;
	pageCount: number;
	total: number;
}

export interface AllStacksResult {
	results: IStack[];
	pagination: Pagination;
}
