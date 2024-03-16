import { categories } from '$lib';
import type { Listing } from '$lib/types';
import type { PageLoad } from './$types';
import { z } from 'zod';

export const load: PageLoad = () => {
	const listings: z.infer<typeof Listing>[] = [
		{
			title: 'Pre-Owned Mountain Bike in Good Condition',
			category: categories.E5,
			description:
				'Get ready to hit the trails with this sturdy and reliable mountain bike. Despite being pre-owned, it has been well-maintained and is in good condition, ready for your next outdoor adventure. Features include a durable frame, responsive braking system, gear shifters for varying terrain, and all-terrain tires for a stable ride on both dirt paths and rocky slopes. Perfect for cycling enthusiasts looking for a cost-effective option without compromising on quality.',
			location: 'Gdańsk, Poland',
			condition: 'fair'
		}
	];
	return {
		listings
	};
};
