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
		if (!session && pathname !== '/login') {
			push('/login');
		} else if (session && pathname === '/login') {
			push('/');
		}
	}, [session]);

	const providerValue = useMemo<AuthContextValue>(
		() => ({ user: session?.user || null }),
		[]
	);

	return (
		<AuthContext.Provider value={providerValue}>
			{status === 'loading' ? 'loading...' : children}
		</AuthContext.Provider>
	);
};

export { AuthContext };
export default AuthProvider;
