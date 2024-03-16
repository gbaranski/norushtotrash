import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms';
import { Listing } from '$lib/types.js';

export const load = async ({ url }) => {
	const classification = {
		title: url.searchParams.get('title') || '',
		category: url.searchParams.get('category') || '',
		description: url.searchParams.get('description') || '',
		cid: url.searchParams.get('cid') || ''
	};
	const form = await superValidate(classification, zod(Listing));

	return { form };
};