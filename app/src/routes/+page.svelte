<script lang="ts">
	import { categories } from '$lib';
	import { Listing } from '$lib/types';
	import { z } from 'zod';
	import Spinner from '$lib/components/Spinner.svelte';
	import ListingView from '$lib/components/Listing.svelte';
	import { signer } from '$lib/store.js';

	const listings: z.infer<typeof Listing>[] = [
		{
			title: 'Pre-Owned Mountain Bike in Good Condition',
			category: categories.E5,
			description:
				'Get ready to hit the trails with this sturdy and reliable mountain bike. Despite being pre-owned, it has been well-maintained and is in good condition, ready for your next outdoor adventure. Features include a durable frame, responsive braking system, gear shifters for varying terrain, and all-terrain tires for a stable ride on both dirt paths and rocky slopes. Perfect for cycling enthusiasts looking for a cost-effective option without compromising on quality.',
			location: 'Gdańsk, Poland',
			condition: 'fair',
			cid: 'bafybeiapxribice6lrwb5oziazyg5nts2xdihiergov23qyz7747y4hyaa'
		}
	];

	export let data;

	const nrtt = data.contract.connect($signer);
</script>

<div class="md:p-8 flex flex-col gap-8">
	{#await nrtt.listingCount()}
		<Spinner context="Loading number of listings" />
	{:then listingCount}
		<div class="flex flex-row gap-8">
			{#each { length: Number(listingCount) } as _, i}
				{#await nrtt.listings(i)}
					<Spinner context="Loading listing no. {i}" />
				{:then listing}
					<ListingView listing={listings[0]} onClick={() => console.log('clicked')} />
				{/await}
			{/each}
		</div>
	{/await}
	<a href="/classifier" class="link link-primary">Create a new listing with AI</a>
</div>
