export type Tcategory =
	| 'Languages'
	| 'Libraries & Frameworks'
	| 'Tools & Services'
	| 'Environments'
	| 'Concepts & Fields';

export interface IStack {
	id: string;
	name: string;
	description: string | null;
	category: Tcategory | null;
	link: string | null;
	requirements: string[];
	icon: string | null;
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
