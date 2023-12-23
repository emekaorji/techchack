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
	shortDescription: string;
	category: Tcategory;
	link: string;
	requirements: string[];
	icon: string;
	releaseDate: Date | null;
	creators: string[];
}

export interface IMergedStack extends IStack {
	score: number;
	experience: number;
	proofs: string[];
}

export interface IPagination {
	limit: number;
	orderBy: string;
	pageNumber: number;
	pageCount: number;
	total: number;
}

export interface AllStacksResult {
	results: IStack[];
	pagination: IPagination;
}
