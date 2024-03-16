import { z } from 'zod';

export const CreateListing = z.object({
	title: z.string(),
	category: z.string(),
	description: z.string(),
	location: z.string(),
	condition: z.enum(['like-new', 'good', 'fair', 'broken', 'unknown']),
	cid: z.string(),
});

export type Listing = {
	owner: string;
	isReserved: boolean;
	creationTime: bigint;
	title: string;
	category: string;
	description: string;
	location: string;
	condition: string;
	cid: string;
}

export type Escrow = {
	listingId: bigint;
	buyer: string,
	sellerConfirmed: boolean,
	buyerConfirmed: boolean,
}