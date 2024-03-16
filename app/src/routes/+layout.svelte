<script lang="ts">
	import '@fontsource-variable/dm-sans';
	import '@fontsource/londrina-solid';
	import '../app.css';
	import type { LayoutData } from './$types';
	import Spinner from '$lib/components/Spinner.svelte';
	import { onMount } from 'svelte';
	import { signer } from '$lib/store';
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
</div>
