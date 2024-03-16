<script lang="ts">
	import { signer } from '$lib/store';
	import { type Escrow, type Listing } from '$lib/types';
	import { DateTime } from 'luxon';
	import Spinner from './Spinner.svelte';

	export let listing: Listing;
	export let escrow: Escrow;
	export let onClick: () => void;

	const me = $signer.getAddress();
	const imageURL = `https://${listing.cid}.ipfs.nftstorage.link/`;
</script>

{#await me}
	<Spinner context="Loading your address" />
{:then myAddress}
	<div class="card card-compact shrink-0 w-72 shadow-md">
		<figure>
			<img class="card-image" src={imageURL} alt={listing.title} />
		</figure>
		<div class="card-body gap-6 justify-between">
			<div>
				<h2 class="card-title">{listing.title}</h2>
				<!-- <p class="text-md">{listing.location} - {listing.date}</p> -->
				<p class="text-md">
					{listing.location} - {DateTime.fromSeconds(Number(listing.creationTime)).toLocaleString(
						DateTime.DATETIME_MED
					)}
				</p>
			</div>
			<div class="card-actions justify-center">
				{#if escrow.buyer !== '0x0000000000000000000000000000000000000000' && (escrow.buyer === myAddress || listing.owner === myAddress)}
					<a href="/escrow/{escrow.listingId}" class="btn btn-outline w-full text-lg">Open</a>
				{:else if escrow.buyer !== '0x0000000000000000000000000000000000000000'}
					<button class="btn btn-outline w-full text-lg" disabled>Reserved by someone else</button>
				{:else}
					<button class="btn btn-primary w-full text-lg" on:click={onClick}>Reserve</button>
				{/if}
			</div>
		</div>
	</div>
{/await}
