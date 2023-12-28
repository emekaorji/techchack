import { ReactNode, createContext, useMemo, useState } from 'react';
import { ProfileViewContextValue } from '../types/context';
import { IMergedStack } from '@/types/stack';

interface ProfileProviderProps {
	children: ReactNode;
	mergedStacks: IMergedStack[];
}

const ProfileViewContext = createContext<ProfileViewContextValue | null>(null);

const ProfileViewProvider = ({
	children,
	mergedStacks: _mergedStacks,
}: ProfileProviderProps) => {
	const [stacks, setStacks] = useState<IMergedStack[]>(_mergedStacks);

	const providerValue = useMemo<ProfileViewContextValue>(
		() => ({ stacks }),
		[stacks]
	);

	return (
		<ProfileViewContext.Provider value={providerValue}>
			{children}
		</ProfileViewContext.Provider>
	);
};

export { ProfileViewContext };
export default ProfileViewProvider;
