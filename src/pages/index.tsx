import { GetServerSideProps } from 'next';
import { Session, getServerSession } from 'next-auth';
import { nextAuthOptions } from './api/auth/[...nextauth]';

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
		redirect: {
			permanent: false,
			destination: `/profile`,
		},
	};
};

export default function HomePage() {
	return '';
}
