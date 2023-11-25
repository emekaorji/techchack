import { GetServerSideProps } from 'next';
import { Session, getServerSession } from 'next-auth';
import { nextAuthOptions } from './api/auth/[...nextauth]';
import Profile from '@/components/views/profile/profile';
import { stacks } from '@/db/schema';
import { techChackDB } from '@/db';
import { inArray } from 'drizzle-orm';
import { IStack } from '@/types/stack';

export const getServerSideProps: GetServerSideProps<{
	session: Session;
	userStacks: IStack[];
}> = async (context) => {
	const session = await getServerSession(
		context.req,
		context.res,
		nextAuthOptions
	);

	if (session) {
		const stackIds = session.user.stacks.map((item) => item.id);

		const userStacks = await techChackDB
			.select()
			.from(stacks)
			.where(inArray(stacks.id, stackIds));

		const parsedUserStacks = userStacks.map(
			(result) =>
				({
					category: result.category,
					description: result.description || '',
					icon: result.icon || '',
					id: result.id,
					link: result.link || '',
					name: result.name,
					requirements: result.requirements || [],
				} satisfies IStack)
		);

		return {
			props: {
				session,
				userStacks: parsedUserStacks,
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

interface ProfilePageProps {
	userStacks: IStack[];
}

export default function ProfilePage({ userStacks }: ProfilePageProps) {
	return <Profile userStacks={userStacks} />;
}
