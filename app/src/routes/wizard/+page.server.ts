import { fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms';
import { Listing } from '$lib/types.js';

export const load = async ({ url }) => {
	const classification = {
		title: url.searchParams.get('title') || '',
		category: url.searchParams.get('category') || '',
		description: url.searchParams.get('description') || ''
	};
	const form = await superValidate(classification, zod(Listing));

	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(Listing));

		if (!form.valid) {
			return fail(400, { form });
		}
		console.log({ form });

        return fail(400, { form });
	}
};
