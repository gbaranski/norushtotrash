<script lang="ts">
	import type { FormEventHandler } from 'svelte/elements';
	import { superForm } from 'sveltekit-superforms';

	export let data;

	const { form, errors, enhance } = superForm(data.form);
    const onInput: FormEventHandler<HTMLInputElement> = (e) => {
        $form.image = e.currentTarget.files?.item(0) as File;
    }
</script>

<form method="POST" enctype="multipart/form-data" class="form-control" use:enhance>
	<input
		type="file"
		name="image"
		accept="image/png, image/jpeg"
		on:input={onInput}
	/>
	{#if $errors.image}<span>{$errors.image}</span>{/if}
	<button>Submit</button>
</form>
