<script lang="ts">
	import { categories } from '$lib';
	import { get } from '$lib/provider';
	import { Listing } from '$lib/types';
	import { z } from 'zod';
	import { NoRushToTrash__factory } from '../../../sc/typechain-types';
	import { PUBLIC_SC_NORUSHTOTRASH_ADDRESS } from '$env/static/public';
	import Spinner from '$lib/components/Spinner.svelte';

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

	const provider = get();
	// if (!provider) return fail(400, { message: 'Ethereum provider not available' });
	// const signer = await provider.getSigner();
</script>

{#if provider === null}
	<p class="text-red-500">No provider available :/</p>
{:else}
	{@const contract = NoRushToTrash__factory.connect(PUBLIC_SC_NORUSHTOTRASH_ADDRESS, provider)}
	{#await provider.getSigner()}
		<Spinner context="Waiting for user to accept." />
	{:then signer}
		{@const nrtt = contract.connect(signer)}
		<div class="space-y-4">
			{#await nrtt.listingCount()}
				<Spinner context="Loading number of listings" />
			{:then listingCount}
				{#each { length: Number(listingCount) } as _, i}
					{#await nrtt.listings(i)}
						<Spinner context="Loading listing no. {i}" />
					{:then listing}
						<div>
							<p>{listing.title}</p>
							<p>{listing.description}</p>
						</div>
					{/await}
				{/each}
			{/await}
		</div>
	{:catch err}
		<p class="text-red-500">getSigner() error: {err}</p>
	{/await}
{/if}

<a href="/classifier" class="link link-primary">Create a new listing with AI</a>
