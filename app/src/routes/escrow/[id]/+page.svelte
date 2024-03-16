<script lang="ts">
	import { FAKE_TIMEOUT } from '$lib';
	import Spinner from '$lib/components/Spinner.svelte';
	import { loading, signer } from '$lib/store';
	import type { Escrow, Listing } from '$lib/types';
	import type { NoRushToTrash } from '../../../../../sc/typechain-types';

	export let data;

	const nrtt = data.contract.connect($signer) as NoRushToTrash;

	const confirm = async (listing: Listing, escrow: Escrow) => {
		const me = await $signer.getAddress();
		const isSeller = listing.owner === me;
		await nrtt.confirmTransaction(data.id, isSeller);
		$loading = "Submitting confirmatino";
		setTimeout(() => {
			location.reload();
			$loading = null;
		}, FAKE_TIMEOUT)
	};
</script>

<div class="p-8">
	{#await nrtt.listings(data.id)}
		<Spinner context="Loading listing" />
	{:then listing}
		{#await nrtt.escrows(data.id)}
			<Spinner context="Loading escrow" />
		{:then escrow}
			{#if escrow.listingId === 0n}
				<p>Transaction completed!</p>
			{:else}
				<p>Seller confirmed? {escrow.sellerConfirmed}</p>
				<p>Buyer confirmed? {escrow.buyerConfirmed}</p>
				<button class="btn btn-primary w-full text-lg" on:click={() => confirm(listing, escrow)}
					>Confirm</button
				>
			{/if}
		{/await}
	{/await}
</div>
