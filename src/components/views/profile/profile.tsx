import ProfileProvider from './provider/provider';
import useProfileContext from './hooks/useProfileContext';
import StackShelf from './stackShelf/stackShelf';
import StackSearch from './stackSearch/stackSearch';
import StackList from './stackList/stackList';
import Head from '@/components/others/head/head';
import { IMergedStack } from '@/types/stack';

const ProfileConsumer = () => {
	const { observerTarget } = useProfileContext();

	return (
		<>
			<Head
				description='Share your tech stack with the world'
				title='TechChack | Profile'
			/>
			<StackShelf />
			<StackSearch />
			<StackList />
			<br id='brElem' ref={observerTarget} />
		</>
	);
};

interface ProfileProps {
	mergedStacks: IMergedStack[];
}

const Profile = ({ mergedStacks }: ProfileProps) => (
	<ProfileProvider mergedStacks={mergedStacks}>
		<ProfileConsumer />
	</ProfileProvider>
);

export default Profile;
