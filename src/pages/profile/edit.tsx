import { GetServerSideProps } from 'next';
import { Session, getServerSession } from 'next-auth';
import { nextAuthOptions } from '../api/auth/[...nextauth]';
import { stacks } from '@/db/schema';
import { techChackDB } from '@/db';
import { inArray } from 'drizzle-orm';
import { IMergedStack } from '@/types/stack';
import ProfileEditView from '@/components/views/profileEdit/profileEdit';

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
		// const userStacks = session.user.stacks;
		// const stackIds = userStacks.map((item) => item.id);

		// const publicStacks = stackIds.length
		// 	? await techChackDB
		// 			.select()
		// 			.from(stacks)
		// 			.where(inArray(stacks.id, stackIds))
		// 	: [];

		// const mergedStacks = publicStacks.map(
		// 	(stack) =>
		// 		({
		// 			category: stack.category,
		// 			description: stack.description || '',
		// 			icon: stack.icon || '',
		// 			id: stack.id,
		// 			link: stack.link || '',
		// 			name: stack.name,
		// 			requirements: stack.requirements || [],
		// 			score: userStacks.find((item) => item.id === stack.id)?.score || 1,
		// 		} satisfies IMergedStack)
		// );

		return {
			props: {
				session,
				mergedStacks: [],
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

interface ProfileEditPageProps {
	mergedStacks: IMergedStack[];
}

export default function ProfileEditPage({
	mergedStacks,
}: ProfileEditPageProps) {
	return <ProfileEditView mergedStacks={mergedStacks} />;
}
