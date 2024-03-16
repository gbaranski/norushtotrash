import { fail, redirect, type RequestHandler } from '@sveltejs/kit';
import { zod, type ValidationAdapter } from 'sveltekit-superforms/adapters';
import { superValidate, withFiles } from 'sveltekit-superforms';
import { z } from 'zod';
import fs from 'fs';
import { classify } from '$lib/server/ai.js';

const PostItem = z.object({
	image: z
		.instanceof(File, { message: 'Please upload a file.' })
		.refine((f) => f.size < 10_000_000, 'Max 10 MB upload size.')
});

export const load = async (event) => {
	const form = await superValidate(zod(PostItem));

	return { form };
};

export const actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, zod(PostItem));

		if (!form.valid) {
			return fail(400, withFiles({ form }));
		}

		const classification = await classify(form.data.image);
		console.log({ classification });

		return redirect(
			303,
			`/wizard?title=${classification.title}&category=${classification.category}&description=${classification.description}`
		);
	}
};
