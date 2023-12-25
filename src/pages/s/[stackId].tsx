import SingleStackView from '@/components/views/singleStack/singleStack';
import { GetServerSideProps } from 'next';
import { Session, getServerSession } from 'next-auth';
import { nextAuthOptions } from '../api/auth/[...nextauth]';
import { stacks } from '@/db/schema';
import { techChackDB } from '@/db';
import { eq } from 'drizzle-orm';
import { IStack } from '@/types/stack';

export const getServerSideProps: GetServerSideProps<{
	session: Session;
	stack: IStack | null;
}> = async (context) => {
	const session = await getServerSession(
		context.req,
		context.res,
		nextAuthOptions
	);

	if (session) {
		const stackId = (context.params?.stackId as string) || '';

		const stack = await techChackDB
			.select()
			.from(stacks)
			.where(eq(stacks.id, stackId))
			.get();

		const parsedStack = stack
			? ({
					category: stack.category,
					description: stack.description || '',
					icon: stack.icon || '',
					id: stack.id,
					link: stack.link || '',
					name: stack.name,
					requirements: stack.requirements || [],
					creators: stack.creators || [],
					releaseDate: stack.releaseDate || null,
					shortDescription: stack.shortDescription || '',
			  } satisfies IStack)
			: null;

		return {
			props: {
				session,
				stack: parsedStack,
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
interface SingleStackPageProps {
	stack: IStack | null;
}

export default function SingleStackPage({ stack }: SingleStackPageProps) {
	return <SingleStackView stack={stack} />;
}
