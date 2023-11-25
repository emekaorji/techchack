import SingleStackView from '@/components/views/singleStack/singleStack';
import { GetServerSideProps } from 'next';
import { Session, getServerSession } from 'next-auth';
import { nextAuthOptions } from '../api/auth/[...nextauth]';

export const getServerSideProps: GetServerSideProps<{
	session: Session | null;
}> = async (context) => {
	console.log(context.req.url);

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

const SingleStackPage = () => {
	return <SingleStackView />;
};

export default SingleStackPage;
