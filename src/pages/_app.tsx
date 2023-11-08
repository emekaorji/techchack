import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import AuthProvider from '@/providers/authProvider';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider session={pageProps.session}>
			<AuthProvider>
				<Component {...pageProps} />
			</AuthProvider>
		</SessionProvider>
	);
}
