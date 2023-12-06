import { GetServerSideProps } from 'next';
import { Session, getServerSession } from 'next-auth';
import { nextAuthOptions } from './api/auth/[...nextauth]';
import Login from '@/components/views/login/login';

export const getServerSideProps: GetServerSideProps<{
	session: Session | null;
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
			redirect: {
				permanent: false,
				destination: `/profile`,
			},
		};
	} else {
		return {
			props: {
				session: null,
			},
		};
	}
};

export default function Home() {
	return <Login />;
}
