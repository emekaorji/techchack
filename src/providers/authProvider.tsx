import { IPublicUser } from '@/types/user';
import { AuthContextValue } from '@/types/context';
import { useSession } from 'next-auth/react';
import { ReactNode, createContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
	children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
	const { status, data: session } = useSession();

	console.log(session);

	const [user, setUser] = useState<IPublicUser | null>(session?.user || null);

	useEffect(() => {
		if (session?.user) {
			setUser(session.user);
		}
	}, [session]);

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
