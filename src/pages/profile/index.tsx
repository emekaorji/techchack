import { GetServerSideProps } from 'next';
import { Session, getServerSession } from 'next-auth';
import { nextAuthOptions } from '../api/auth/[...nextauth]';
import Profile from '@/components/views/profile/profile';
import { stacks } from '@/db/schema';
import { techChackDB } from '@/db';
import { inArray } from 'drizzle-orm';
import { IMergedStack } from '@/types/stack';

export const getServerSideProps: GetServerSideProps<{
	session: Session;
	mergedStacks: IMergedStack[];
}> = async (context) => {
	const session = await getServerSession(
		context.req,
		context.res,
		nextAuthOptions
	);

	if (session) {
		const userStacks = session.user.stacks;
		const stackIds = userStacks.map((item) => item.id);

		const publicStacks = stackIds.length
			? await techChackDB
					.select()
					.from(stacks)
					.where(inArray(stacks.id, stackIds))
			: [];

		const mergedStacks = publicStacks.map(
			(stack) =>
				({
					category: stack.category,
					description: stack.description || '',
					icon: stack.icon || '',
					id: stack.id,
					link: stack.link || '',
					name: stack.name,
					requirements: stack.requirements || [],
					score: userStacks.find((item) => item.id === stack.id)?.score || 0,
					creators: stack.creators || [],
					experience:
						userStacks.find((item) => item.id === stack.id)?.experience || 0,
					proofs: userStacks.find((item) => item.id === stack.id)?.proofs || [],
					releaseDate: stack.releaseDate || null,
					shortDescription: stack.shortDescription || '',
				} satisfies IMergedStack)
		);

		return {
			props: {
				session,
				mergedStacks,
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
	mergedStacks: IMergedStack[];
}

export default function ProfilePage({ mergedStacks }: ProfilePageProps) {
	return <Profile mergedStacks={mergedStacks} />;
}
