<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<p>
   Title: {data.title} 
</p>
<p>
   Category: {data.category} 
</p>
<p>
   Description: {data.description} 
</p>
