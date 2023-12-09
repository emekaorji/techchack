import { GetServerSideProps } from 'next';
import { Session, getServerSession } from 'next-auth';
import { nextAuthOptions } from './api/auth/[...nextauth]';
import getAllStacks from '@/api/stacks/getAllStacks';
import { AllStacksResult } from '@/types/stack';
import AllStacksView from '@/components/views/allStacks/allStacks';

export const getServerSideProps: GetServerSideProps<{
	session: Session;
	allStacksResult: AllStacksResult;
}> = async (context) => {
	const session = await getServerSession(
		context.req,
		context.res,
		nextAuthOptions
	);

	if (!session) {
		return {
			redirect: {
				permanent: false,
				destination: `/login`,
			},
		};
	}

	const {
		perPage = '50',
		orderBy = '',
		page = '1',
		search,
	} = context.query as { [key: string]: string };
	const allStacksResult = await getAllStacks(perPage, orderBy, page, search);

	return {
		props: {
			session,
			allStacksResult,
		},
	};
};

interface StacksPageProps {
	allStacksResult?: AllStacksResult;
}

export default function StacksPage({ allStacksResult }: StacksPageProps) {
	return <AllStacksView allStacksResult={allStacksResult} />;
}
