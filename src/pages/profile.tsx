import { GetServerSideProps } from 'next';
import { Session, getServerSession } from 'next-auth';
import { nextAuthOptions } from './api/auth/[...nextauth]';
import Profile from '@/components/views/profile/profile';

export const getServerSideProps: GetServerSideProps<{
	session: Session | null;
}> = async (context) => {
	return {
		props: {
			session: await getServerSession(
				context.req,
				context.res,
				nextAuthOptions
			),
		},
	};
};

export default function ProfilePage() {
	return <Profile />;
}
