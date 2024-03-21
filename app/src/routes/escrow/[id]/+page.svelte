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
		$loading = 'Submitting confirmation';
		setTimeout(() => {
			location.reload();
			$loading = null;
		}, FAKE_TIMEOUT);
	};
</script>

<div class="flex flex-col gap-12 p-8">
	{#await nrtt.listings(data.id)}
		<Spinner context="Loading listing" />
	{:then listing}
		{#await nrtt.escrows(data.id)}
			<Spinner context="Loading escrow" />
		{:then escrow}
			{#if escrow.listingId === 0n}
				<div class="flex flex-col items-center">
				<div class="flex flex-col items-center">
					<span class="text-2xl items-center">Transaction completed! </span>
					<span class="text-2xl items-center">You saved 10kg of CO2. The planet is thankful 🙏</span>
					<iconify-icon
						icon="arcticons:cube-escape-collection"
						class="w-1/2 text-slate-600"
						width={64}
					></iconify-icon>
				</div>
				</div>
			{:else}
				<span class="text-2xl">1. Open chat with the counterparty and discuss transaction details</span>
				<span class="text-2xl">2. Collect the item and confirm transaction</span>
				<div class="flex flex-row justify-center items-center gap-16">
					<div class="flex flex-col">
						<span class="text-2xl">Buyer</span>
						{#if escrow.buyerConfirmed}
							<iconify-icon
								icon="material-symbols:check-circle"
								class="w-1/2 text-green-600"
								width={64}
							/>
						{:else}
							<iconify-icon
								icon="material-symbols:check-circle-outline"
								class="w-1/2 text-slate-600"
								width={64}
							/>
						{/if}
					</div>

					<div class="flex flex-col">
						<span class="text-2xl">Seller</span>
						{#if escrow.sellerConfirmed}
							<iconify-icon
								icon="material-symbols:check-circle"
								class="w-1/2 text-green-600"
								width={64}
							/>
						{:else}
							<iconify-icon
								icon="material-symbols:check-circle-outline"
								class="w-1/2 text-slate-600"
								width={64}
							/>
						{/if}
					</div>
				</div>
				<button class="btn btn-primary w-full text-lg" on:click={() => confirm(listing, escrow)}
					>Confirm</button
				>
			{/if}
		{/await}
	{/await}
</div>
