export const variables =
	process.env.NODE_ENV !== 'production'
		? {
				GITHUB_CLIENT_ID: process.env.DEV_GITHUB_CLIENT_ID,
				GITHUB_CLIENT_SECRET: process.env.DEV_GITHUB_CLIENT_SECRET,
				DATABASE_URL: process.env.DEV_DATABASE_URL,
				DATABASE_AUTH_TOKEN: process.env.DEV_DATABASE_AUTH_TOKEN,
		  }
		: {
				GITHUB_CLIENT_ID: process.env.PROD_GITHUB_CLIENT_ID,
				GITHUB_CLIENT_SECRET: process.env.PROD_GITHUB_CLIENT_SECRET,
				DATABASE_URL: process.env.PROD_DATABASE_URL,
				DATABASE_AUTH_TOKEN: process.env.PROD_DATABASE_AUTH_TOKEN,
		  };
