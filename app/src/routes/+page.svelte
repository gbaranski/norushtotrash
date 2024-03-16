<script lang="ts">
	import Spinner from '$lib/components/Spinner.svelte';
	import ListingView from '$lib/components/Listing.svelte';
	import { signer } from '$lib/store.js';
	import type { NoRushToTrash } from '../../../sc/typechain-types/index.js';
	import { Listing } from '$lib/types.js';
	import { DateTime } from 'luxon';
	import heroRightImg from '$lib/assets/hero-right.png';

	export let data;

	const nrtt = data.contract.connect($signer) as NoRushToTrash;

	const reserve = async (id: bigint) => {
		console.log({ id, nrtt });
		const tx = await nrtt.reserveListing(id);
		console.log({ tx });
	};
</script>

<div class="flex flex-col gap-8">
	<div class="flex flex-row bg-[#DDF247] px-12 py-36 items-center">
		<div class="flex flex-col gap-4 flex-1 relative">
			<div class="text-5xl font-londrina">
				<p>Useless to you,</p>
				<p>useful to others</p>
			</div>
			<div class="text-md text-wrap">
				Earth-friendly & carbon-negative platform
				for finding what you need and sharing what you don't.
			</div>
		</div>
		<div class="flex-1 max-md:hidden">
			<img src={heroRightImg} alt="cool right hero graphic"/>
		</div>
	</div>

	{#await nrtt.listingCount()}
		<Spinner context="Loading number of listings" />
	{:then listingCount}
		<div class="flex flex-col md:flex-row gap-8 md:p-8 items-center">
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
			<a href="/classifier" class="btn btn-outline">New listing</a>
		</div>
	{/await}
</div>
