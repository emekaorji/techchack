import { GetServerSideProps } from 'next';
import { Session, getServerSession } from 'next-auth';
import { nextAuthOptions } from './api/auth/[...nextauth]';
import ContributeView from '@/components/views/contribute/contribute';

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

interface ProfilePageProps {}

export default function ProfilePage({}: ProfilePageProps) {
	return <ContributeView />;
}
