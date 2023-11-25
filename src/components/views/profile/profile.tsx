// import { signOut } from 'next-auth/react';
import ProfileProvider from './provider/provider';
import useProfileContext from './hooks/useProfileContext';
import Shelf from './shelf/shelf';
import StackSearch from './search/search';
import StackList from './stackList/stackList';
import Head from '@/components/others/head/head';

const ProfileConsumer = () => {
	const { observerTarget } = useProfileContext();

	return (
		<>
			<Head
				description='Share your tech stack with the world'
				title='TechChack | Profile'
			/>
			{/* <button onClick={() => signOut()}>Sign Out</button> */}
			<Shelf />
			<StackSearch />
			<StackList />
			<br id='brElem' ref={observerTarget} />
		</>
	);
};

const Profile = () => (
	<ProfileProvider>
		<ProfileConsumer />
	</ProfileProvider>
);

export default Profile;
