<script lang="ts">
	import { loading } from '$lib/store.js';
	import type { FormEventHandler } from 'svelte/elements';
	import { superForm } from 'sveltekit-superforms';

	export let data;

	const { form, errors, enhance, delayed } = superForm(data.form);
	
	$: $loading =  $delayed ? "Submitting photo" : null;
	const onInput: FormEventHandler<HTMLInputElement> = (e) => {
		$form.image = e.currentTarget.files?.item(0) as File;
	};
</script>

<form
	method="POST"
	enctype="multipart/form-data"
	class="form-control flex flex-col gap-8 p-4 md:p-20"
	use:enhance
>
	<input type="file" name="image" accept="image/png, image/jpeg" on:input={onInput} />
	{#if $errors.image}<span>{$errors.image}</span>{/if}
	<button type="submit" class="btn btn-neutral">Continue</button>
</form>
