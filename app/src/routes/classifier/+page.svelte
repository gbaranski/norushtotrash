<script lang="ts">
	import type { FormEventHandler } from 'svelte/elements';
	import { superForm } from 'sveltekit-superforms';

	export let data;

	const { form, errors, enhance, delayed } = superForm(data.form);
	const onInput: FormEventHandler<HTMLInputElement> = (e) => {
		$form.image = e.currentTarget.files?.item(0) as File;
	};
</script>

{#if $delayed}
	<div class="absolute bg-white bg-opacity-60 z-10 h-full w-full flex items-center justify-center">
		<div class="flex items-center">
		  <span class="text-3xl mr-4">Classifying product...</span>
		  <svg class="animate-spin h-8 w-8 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none"
			viewBox="0 0 24 24">
			<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
			<path class="opacity-75" fill="currentColor"
			  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
			</path>
		  </svg>
		</div>
	  </div>
{/if}
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
