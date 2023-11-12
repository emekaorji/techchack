import LoaderIcon from '@/components/interface/icons/loader';
import { AuthContextValue } from '@/types/context';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ReactNode, createContext, useEffect, useMemo } from 'react';

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
	children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
	const { status, data: session } = useSession();
	const { pathname, push } = useRouter();

	useEffect(() => {
		if (status !== 'loading') {
			if (!session && pathname !== '/login') {
				push('/login');
			} else if (session && pathname === '/login') {
				push('/profile');
			}
		}
	}, [session]);

	const providerValue = useMemo<AuthContextValue>(
		() => ({ user: session?.user || null }),
		[session]
	);

	return (
		<AuthContext.Provider value={providerValue}>
			{status === 'loading' ? 'TechChack' : children}
		</AuthContext.Provider>
	);
};

export { AuthContext };
export default AuthProvider;
