export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DEV_GITHUB_CLIENT_ID: string;
			DEV_GITHUB_CLIENT_SECRET: string;
			STAG_GITHUB_CLIENT_ID: string;
			STAG_GITHUB_CLIENT_SECRET: string;
			TECHCHACK_SECRET: string;
			DATABASE_URL: string;
			DATABASE_AUTH_TOKEN: string;
		}
	}
}
