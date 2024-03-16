import { fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms';
import { z } from 'zod';
import { categories } from '$lib';

const CreateListing = z.object({
	title: z.string(),
	category: z.string(),
	description: z.string(),
	condition: z.enum(['like-new', 'good', 'fair', 'broken', 'unknown'])
});

export const load = async ({ url }) => {
	const classification = {
		title: url.searchParams.get('title') || '',
		category: url.searchParams.get('category') || '',
		description: url.searchParams.get('description') || ''
	};
	const form = await superValidate(classification, zod(CreateListing));

	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(CreateListing));

		if (!form.valid) {
			return fail(400, { form });
		}
		console.log({ form });

        return fail(400, { form });
	}
};
