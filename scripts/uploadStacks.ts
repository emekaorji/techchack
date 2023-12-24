import stacksData from '@/data/stacks-0.json';
import { techChackDB } from '@/db';
import { stacks } from '@/db/schema';
import { IStack } from '@/types/stack';

async function batchUploadToTurso() {
	try {
		console.log('Starting upload');
		let count = 0;
		while (count < (stacksData as IStack[]).length) {
			const stack = (stacksData as IStack[])[count];
			console.log(`Uploading(${count + 1}): `, stack.name);
			await techChackDB.insert(stacks).values(stack).returning().get();
			count++;
		}
		console.log('Defeated Shao Kahn Gracefully!!');
	} catch (error: any) {
		console.error(error.message);
	}
}

batchUploadToTurso();
