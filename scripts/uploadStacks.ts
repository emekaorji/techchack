import stacksData from '@/data/stacks.json';
import { techChackDB } from '@/db';
import { stacks } from '@/db/schema';
import { IStack } from '@/types/stack';

async function batchUploadToTurso() {
	try {
		console.log('Starting upload');
		await Promise.all(
			(stacksData as IStack[]).map((stack) => {
				console.log('Uploading: ', stack.name);
				return techChackDB.insert(stacks).values(stack).returning().get();
			})
		);
		console.log('Defeated Shao Kahn Gracefully!!');
	} catch (error: any) {
		console.error(error.message);
	}
}

batchUploadToTurso();
