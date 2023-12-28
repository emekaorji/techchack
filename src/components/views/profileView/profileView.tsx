import ProfileViewProvider from './provider/provider';
import Head from '@/components/others/head/head';
import { IMergedStack } from '@/types/stack';
import ProfileSummary from './summary/summary';
import StackList from './stackList/stackList';

const ProfileViewConsumer = () => {
	return (
		<>
			<Head
				description='Share your tech stack with the world'
				title='TechChack | Profile View'
			/>
			<ProfileSummary />
			<StackList />
			<br />
		</>
	);
};

interface ProfileProps {
	mergedStacks: IMergedStack[];
}

const ProfileView = ({ mergedStacks }: ProfileProps) => (
	<ProfileViewProvider mergedStacks={mergedStacks}>
		<ProfileViewConsumer />
	</ProfileViewProvider>
);

export default ProfileView;
