import { GetServerSideProps } from 'next';
import { Session, getServerSession } from 'next-auth';
import { nextAuthOptions } from './api/auth/[...nextauth]';
import Login from '@/components/views/login/login';

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

export default function Home() {
	return <Login />;
}
