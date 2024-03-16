<script lang="ts">
	import { Listing } from '$lib/types';
	import { DateTime } from 'luxon';
	import { z } from 'zod';

	export let listing: z.infer<typeof Listing>;
	export let creationTime: DateTime;

	export let onClick: () => void;
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
			<p class="text-md">{listing.location} - {creationTime.toLocaleString(DateTime.DATETIME_MED)}</p>
		</div>
		<div class="card-actions justify-center">
			<button class="btn btn-primary w-full text-lg" on:click={onClick}>Reserve</button>
		</div>
	</div>
</div>
