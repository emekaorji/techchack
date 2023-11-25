import '@/styles/globals.css';
import '@/scripts/console';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import AuthProvider from '@/providers/authProvider';
import Wrapper from '@/components/layout/wrapper/wrapper';
import ModalProvider from '@/providers/modalProvider';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider session={pageProps.session}>
			<ModalProvider>
				<AuthProvider>
					<Wrapper>
						<Component {...pageProps} />
					</Wrapper>
				</AuthProvider>
			</ModalProvider>
		</SessionProvider>
	);
}
