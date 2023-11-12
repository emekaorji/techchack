import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import AuthProvider from '@/providers/authProvider';
import Wrapper from '@/components/layout/wrapper/wrapper';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider session={pageProps.session}>
			<AuthProvider>
				<Wrapper>
					<Component {...pageProps} />
				</Wrapper>
			</AuthProvider>
		</SessionProvider>
	);
}
