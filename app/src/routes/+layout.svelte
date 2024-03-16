<script lang="ts">
	import '@fontsource-variable/dm-sans';
	import '@fontsource/londrina-solid';
	import '../app.css';
	import type { LayoutData } from './$types';
	import Spinner from '$lib/components/Spinner.svelte';
	import { onMount } from 'svelte';
	import { loading, signer } from '$lib/store';
	import { getAvatarURL } from '$lib/noun';
	// import { Client } from '@xmtp/xmtp-js';

	export let data: LayoutData;
	let initialized = false;
	onMount(async () => {
		if ($signer) return;
		$signer = await data.provider.getSigner();
		// $xmtp = await Client.create($signer, { env: 'dev' });
		initialized = true;
	});
</script>

<div class="h-screen w-screen">
	{#if data.provider}
		{#if initialized}
			<div class="flex flex-row p-8 justify-between bg-[#2C2C2C]">
				<a class="font-londrina text-[#DDF247] text-5xl uppercase" href="/">No Rush To Trash</a>
				<div class="avatar placeholder">
					<div class="bg-white text-black rounded-full w-12">
						<img src={getAvatarURL($signer.address)} alt="nice avatar" />
					</div>
				</div>
			</div>
			<slot />
		{:else}
			<Spinner context="Waiting for user to accept." />
		{/if}
	{:else}
		<p class="text-red-500">No provider available :/</p>
	{/if}
	{#if $loading}
		<div
			class="absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center"
		>
			<div class="flex items-center">
				<span class="text-3xl mr-4">{$loading}</span>
				<svg
					class="animate-spin h-8 w-8 text-gray-800"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
					></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					>
					</path>
				</svg>
			</div>
		</div>
	{/if}
</div>
