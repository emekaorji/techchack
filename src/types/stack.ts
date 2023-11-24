export type Tcategory =
	| 'Languages'
	| 'Libraries & Frameworks'
	| 'Tools & Services'
	| 'Environments'
	| 'Concepts & Fields'
	| null;

export interface IStack {
	id: string;
	name: string;
	description: string;
	category: Tcategory;
	link: string;
	requirements: string[];
	icon: string;
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
