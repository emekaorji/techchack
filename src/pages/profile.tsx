import { GetServerSideProps } from 'next';
import { Session, getServerSession } from 'next-auth';
import { nextAuthOptions } from './api/auth/[...nextauth]';
import Profile from '@/components/views/profile/profile';

export const getServerSideProps: GetServerSideProps<{
	session: Session;
}> = async (context) => {
	const session = await getServerSession(
		context.req,
		context.res,
		nextAuthOptions
	);

	if (session) {
		return {
			props: {
				session,
			},
		};
	} else {
		return {
			redirect: {
				permanent: false,
				destination: `/login`,
			},
		};
	}
};

export default function ProfilePage() {
	return <Profile />;
}
