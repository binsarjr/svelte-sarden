<script lang="ts">
	import { page } from '$app/stores';
	import { lazyimage } from '$lib';

	let placeholder = 'https://media3.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif';
</script>

<fieldset>
	<legend>Lazy Image</legend>
	<a href={$page.url.toString()} data-sveltekit-reload>Refresh</a>

	<section style="display: flex;">
		<fieldset>
			<legend>With Placeholder</legend>
			<div>
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img
					src={placeholder}
					alt="image placeholder"
					data-src="https://random.imagecdn.app/100/100"
					use:lazyimage={{
						cache: false
					}}
				/>
			</div>
		</fieldset>
		<fieldset>
			<legend>Without Placeholder</legend>
			<div>
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img alt="image placeholder" data-src="https://random.imagecdn.app/100/100" use:lazyimage />
			</div>
		</fieldset>
	</section>
	<div>
		<p>Cache will real effect when your server is too slow and not set cache-control</p>
		<p>and some browser not effect. idk why for this. tell me if you know</p>
		<p><strong>Notes:</strong> its working for me on chrome android latest version </p>
	</div>
	<section style="display: flex;">
		<fieldset>
			<legend>With Cache</legend>
			<div>
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img
					src={placeholder}
					alt="image placeholder"
					data-src="/imagenocache?url=https://cdn.wallpapersafari.com/52/45/mQuKgR.jpg"
					width="100px"
					use:lazyimage
				/>
			</div>
		</fieldset>
		<fieldset>
			<legend>Without Cache</legend>
			<div>
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img
					src={placeholder}
					alt="image placeholder"
					data-src="/imagenocache?url=https://cdn.wallpapersafari.com/52/45/mQuKgR.jpg"
					use:lazyimage={{
						cache: false
					}}
					width="100px"
				/>
			</div>
		</fieldset>
	</section>
</fieldset>
