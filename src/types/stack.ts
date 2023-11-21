export type Tcategory =
	| 'Languages'
	| 'Libraries & Frameworks'
	| 'Tools & Services'
	| 'Environments'
	| 'Concepts & Fields';

export interface IStack {
	id: string;
	name: string;
	description: string;
	category: Tcategory;
	link: string;
	requirements: string[];
	icon: string;
}
