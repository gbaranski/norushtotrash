<script lang="ts">
	import Spinner from '$lib/components/Spinner.svelte';
	import ListingView from '$lib/components/Listing.svelte';
	import { signer } from '$lib/store.js';
	import type { NoRushToTrash } from '../../../sc/typechain-types/index.js';
	import { Listing } from '$lib/types.js';
	import {DateTime} from 'luxon';

	export let data;

	const nrtt = data.contract.connect($signer) as NoRushToTrash;
	
	const reserve = async (id: bigint) => {
		console.log({id, nrtt});
		const tx = await nrtt.reserveListing(id)
		console.log({tx});
	}
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
					{#if listing.title}
						<ListingView
							listing={Listing.parse({
								title: listing.title,
								category: listing.category,
								description: listing.description,
								location: listing.location,
								condition: listing.condition,
								cid: listing.cid
							})}
							creationTime={DateTime.fromSeconds(Number(listing.creationTime))}
							onClick={() => reserve(BigInt(i))}
						/>
					{/if}
				{/await}
			{/each}
		</div>
	{/await}
	<a href="/classifier" class="link link-primary">Create a new listing with AI</a>
</div>
