<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let state = false;

	const setTrue = () => {
		state = true;
		dispatch('isTrue');
	};

	const setFalse = () => {
		state = false;
		dispatch('isFalse');
	};

	const toggle = () => {
		state = !state;
		state ? dispatch('isTrue') : dispatch('isFalse');
	};
</script>

<slot {state} {setTrue} {setFalse} {toggle} />
