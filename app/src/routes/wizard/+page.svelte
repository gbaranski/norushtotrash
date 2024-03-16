<script lang="ts">
	import { categories } from '$lib';
	import { signer } from '$lib/store.js';
	import { Listing } from '$lib/types.js';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import type { NoRushToTrash } from '../../../../sc/typechain-types/index.js';

	export let data;

	const { form, errors, constraints, enhance } = superForm(data.form, {
		SPA: true,
		validators: zod(Listing),
		onUpdate({ form }) {
			if (!form.valid) return;
			const nrtt = data.contract.connect($signer) as NoRushToTrash;
			nrtt
				.postListing(
					form.data.title,
					form.data.category,
					form.data.description,
					form.data.condition,
					form.data.location,
					form.data.cid
				)
				.then(() => {
					console.log('listing posted');
				});
		}
	});
</script>

<form method="POST" use:enhance class="form-control gap-12 p-2 md:p-20 flex flex-col">
	<SuperDebug data={$form} />
	<div class="md:grid md:grid-cols-2 gap-x-10 gap-y-6">
		<input type="hidden" name="cid" bind:value={$form.cid} {...$constraints.cid} />

		<label>
			<span class="label label-text">Title</span>
			<input
				class="input input-bordered w-full"
				placeholder="iPhone XS... or something"
				name="title"
				aria-invalid={$errors.title ? 'true' : undefined}
				bind:value={$form.title}
				{...$constraints.title}
			/>
			<div class="label">
				{#if $errors.title}<span class="label-text-alt text-error">{$errors.title}</span>{/if}
			</div>
		</label>

		<label>
			<span class="label label-text">Category</span>
			<select
				class="select select-bordered w-full"
				name="category"
				bind:value={$form.category}
				aria-invalid={$errors.category ? 'true' : undefined}
				{...$constraints.category}
			>
				<option disabled selected>Select category</option>
				{#each Object.entries(categories) as [code, category]}
					<option value={code}>{category}</option>
				{/each}
			</select>
			<div class="label">
				{#if $errors.category}<span class="label-text-alt text-error">{$errors.category}</span>{/if}
			</div>
		</label>

		<label>
			<span class="label label-text">Description</span>
			<textarea
				class="textarea textarea-bordered w-full"
				placeholder="Product description"
				name="description"
				aria-invalid={$errors.description ? 'true' : undefined}
				rows="10"
				bind:value={$form.description}
				{...$constraints.description}
			/>
			<div class="label">
				{#if $errors.description}<span class="label-text-alt text-error">{$errors.description}</span
					>{/if}
			</div>
		</label>

		<label>
			<span class="label label-text">Condition</span>
			<select
				class="select select-bordered w-full"
				name="condition"
				bind:value={$form.condition}
				aria-invalid={$errors.condition ? 'true' : undefined}
				{...$constraints.condition}
			>
				<option disabled selected>Select condition</option>
				<option value="like-new">Like new</option>
				<option value="good">Good</option>
				<option value="fair">Fair</option>
				<option value="broken">Broken</option>
				<option value="unknown">Unknown</option>
			</select>
			<div class="label">
				{#if $errors.condition}<span class="label-text-alt text-error">{$errors.condition}</span
					>{/if}
			</div>
		</label>

		<label>
			<span class="label label-text">Location</span>
			<input
				class="input input-bordered w-full"
				placeholder="e.g Gdańsk, Poland"
				name="location"
				aria-invalid={$errors.location ? 'true' : undefined}
				bind:value={$form.location}
				{...$constraints.location}
			/>
			<div class="label">
				{#if $errors.location}<span class="label-text-alt text-error">{$errors.location}</span>{/if}
			</div>
		</label>
	</div>
	<div class="flex flex-row gap-4 self-end">
		<button type="submit" class="btn btn-neutral">Create listing</button>
	</div>
</form>
