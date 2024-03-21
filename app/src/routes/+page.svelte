<script lang="ts">
	import Spinner from '$lib/components/Spinner.svelte';
	import ListingView from '$lib/components/Listing.svelte';
	import { signer } from '$lib/store.js';
	import type { MCO2Token, NoRushToTrash } from '../../../sc/typechain-types/index.js';
	import heroRightImg from '$lib/assets/hero-right.png';
	import { goto } from '$app/navigation';
	import { FAKE_TIMEOUT } from '$lib';

	export let data;

	const nrtt = data.contract.connect($signer) as NoRushToTrash;
	const carbon = data.carbonContract.connect($signer) as MCO2Token;

	const reserve = async (id: bigint) => {
		console.log({ id, nrtt });
		await carbon.approve(await nrtt.getAddress(), BigInt(25 * 10 ** 18));
		const tx = await nrtt.reserveListing(id);
		console.log({ tx });
		setTimeout(() => {
			goto("/escrow/" + id);
		}, FAKE_TIMEOUT)
	};
</script>

<div class="flex flex-col gap-8">
	<div class="flex flex-row bg-[#DDF247] px-12 py-20 items-center">
		<div class="flex flex-col gap-4 flex-1 relative">
			<div class="text-7xl font-londrina">
				<p>Useless to you,</p>
				<p>useful to others</p>
			</div>
			<div class="text-xl text-wrap">
				Earth-friendly & carbon-negative platform for finding what you need and sharing what you
				don't.
			</div>
		</div>
		<div class="flex-1 max-md:hidden">
			<img src={heroRightImg} alt="cool right hero graphic" />
		</div>
	</div>

	{#await nrtt.listingCount()}
		<Spinner context="Loading number of listings" />
	{:then listingCount}
		<div class="flex flex-col flex-wrap md:flex-row gap-8 md:p-8 items-center">
			{#each { length: Number(listingCount) } as _, i}
				{#await nrtt.listings(i)}
					<Spinner context="Loading listing no. {i}" />
				{:then listing}
					{#if listing.title}
						{#await nrtt.escrows(i)}
							<Spinner context="Loading escrow no. {i}" />
						{:then escrow}
							<ListingView
								listing={listing}
								escrow={escrow}
								onClick={() => reserve(BigInt(i))}
							/>
						{/await}
					{/if}
				{/await}
			{/each}
			<a href="/classifier" class="btn btn-outline">New listing</a>
		</div>
	{/await}
</div>
