export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			TECHCHACK_SECRET: string;

			DEV_GITHUB_CLIENT_ID: string;
			DEV_GITHUB_CLIENT_SECRET: string;
			DEV_DATABASE_URL: string;
			DEV_DATABASE_AUTH_TOKEN: string;

			PROD_GITHUB_CLIENT_ID: string;
			PROD_GITHUB_CLIENT_SECRET: string;
			PROD_DATABASE_URL: string;
			PROD_DATABASE_AUTH_TOKEN: string;
		}
	}
}
