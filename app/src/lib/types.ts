import { z } from 'zod';

export const Listing = z.object({
	title: z.string(),
	category: z.string(),
	description: z.string(),
	location: z.string(),
	condition: z.enum(['like-new', 'good', 'fair', 'broken', 'unknown']),
});
