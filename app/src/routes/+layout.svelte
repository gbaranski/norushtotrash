<script lang="ts">
	import '@fontsource-variable/dm-sans';
	import '../app.css';
	import type { LayoutData } from './$types';
	import Spinner from '$lib/components/Spinner.svelte';
	import { onMount } from 'svelte';
	import { signer } from '$lib/store';

	export let data: LayoutData;
	let initialized = false;
	// const signer = writable();
	onMount(async () => {
		if ($signer) return;
		$signer = await data.provider.getSigner();
		initialized = true;
	});
</script>

<div class="h-screen w-screen">
	{#if data.provider}
		{#if initialized}
			<slot />
		{:else}
			<Spinner context="Waiting for user to accept." />
		{/if}
	{:else}
		<p class="text-red-500">No provider available :/</p>
	{/if}
</div>
