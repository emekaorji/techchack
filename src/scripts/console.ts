if (typeof window !== 'undefined')
	window.console =
		process.env.NODE_ENV === 'production' ? ({} as Console) : console;
