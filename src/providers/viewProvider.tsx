import { ViewContextValue } from '@/types/context';
import { useRouter } from 'next/router';
import {
	ReactNode,
	createContext,
	useCallback,
	useMemo,
	useState,
} from 'react';

const ViewContext = createContext<ViewContextValue | null>(null);

interface ViewProviderProps {
	children: ReactNode;
}

const ViewProvider = ({ children }: ViewProviderProps) => {
	const { pathname } = useRouter();

	const [_background, setBackground] = useState('none');

	const changeBackground = useCallback((background: string) => {
		setBackground(background);
	}, []);

	const background = useMemo(
		() => (pathname === '/s/[stackId]' ? _background : 'none'),
		[_background, pathname]
	);

	const providerValue = useMemo<ViewContextValue>(
		() => ({ background, changeBackground }),
		[background, changeBackground]
	);

	return (
		<ViewContext.Provider value={providerValue}>
			{children}
		</ViewContext.Provider>
	);
};

export { ViewContext };
export default ViewProvider;
