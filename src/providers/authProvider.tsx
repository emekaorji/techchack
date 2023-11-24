import { IPublicUser, IUser } from '@/types/api/user';
import { AuthContextValue } from '@/types/context';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ReactNode, createContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
	children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
	const { status, data: session } = useSession();
	const { pathname, push } = useRouter();

	const [user, setUser] = useState<IPublicUser | null>(session?.user || null);

	useEffect(() => {
		if (session?.user) {
			setUser(session.user);
		}
	}, [session]);

	useEffect(() => {
		if (status !== 'loading') {
			if (!session && pathname !== '/login') {
				push('/login');
			} else if (session && pathname === '/login') {
				push('/profile');
			}
		}
	}, [pathname, push, session, status]);

	const providerValue = useMemo<AuthContextValue>(
		() => ({ user, setUser }),
		[user]
	);

	return (
		<AuthContext.Provider value={providerValue}>
			{status === 'loading' ? 'TechChack' : children}
		</AuthContext.Provider>
	);
};

export { AuthContext };
export default AuthProvider;
