import '';
declare global {
	interface SelectEventTarget {
		value: string;
	}
	interface SelectEvent {
		readonly currentTarget: SelectEventTarget;
		readonly target: SelectEventTarget;
	}
}
