<script lang="ts">
	import { signer } from '$lib/store';
	import { type Escrow, type Listing } from '$lib/types';
	import { DateTime } from 'luxon';
	import { getAvatarURL } from '$lib/noun';

	export let listing: Listing;
	export let escrow: Escrow;
	export let onClick: () => void;
	let donate = "25";

	const me = $signer.getAddress();
	const imageURL = `https://${listing.cid}.ipfs.nftstorage.link/`;
</script>

<div class="card card-compact shrink-0 w-72 shadow-md">
	<figure>
		<img class="card-image" src={imageURL} alt={listing.title} />
	</figure>
	<div class="card-body gap-6 justify-between">
		<div>
			<h2 class="card-title">{listing.title}</h2>
			<!-- <p class="text-md">{listing.location} - {listing.date}</p> -->
			<div class="flex flex-row items-start">
				<p class="text-md">
					{listing.location} - {DateTime.fromSeconds(Number(listing.creationTime)).toLocaleString(
						DateTime.DATETIME_MED
					)}
				</p>
				<img src={getAvatarURL(listing.owner)} alt="nice avatar" class="rounded-full w-12" />
			</div>
		</div>
		<div class="card-actions justify-center gap-2">
			{#if escrow.buyer !== '0x0000000000000000000000000000000000000000' && (escrow.buyer === $signer.address || listing.owner === $signer.address)}
				<a href="/escrow/{escrow.listingId}" class="btn btn-outline w-full text-lg">Open</a>
			{:else if escrow.buyer !== '0x0000000000000000000000000000000000000000'}
				<button class="btn btn-outline w-full text-lg" disabled>Reserved</button>
			{:else if listing.owner === $signer.address}
				<button class="btn btn-outline w-full text-lg" disabled>Owned</button>
			{:else}
				<p>Donate {donate} mCO2 tokens</p>
				<input type="range" min="0" max="100" class="range" step="25" bind:value={donate} />
				<div class="w-full flex justify-between text-xs px-2">
					<span>|</span>
					<span>|</span>
					<span>|</span>
					<span>|</span>
					<span>|</span>
				</div>
				<button class="btn btn-primary w-full text-lg" on:click={onClick}>Reserve</button>
			{/if}
		</div>
	</div>
</div>
