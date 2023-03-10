<script>
	import { LogicState } from '$lib';
</script>

<LogicState let:state let:setTrue let:setFalse let:toggle>
	<table>
		<tr>
			<td>Status</td>
			<td>{state}</td>
		</tr>
		<tr>
			<td>
				<button on:click={setTrue}>setTrue</button>
			</td>
			<td>
				<button on:click={() => setFalse()}>setFalse</button>
			</td>
		</tr>
		<tr>
			<td>
				<button on:click={toggle}>Toggle</button>
			</td>
		</tr>
	</table>
</LogicState>

<!-- if you wanna set true as default -->
<LogicState state={true} let:state let:setTrue let:setFalse let:toggle>
	<table>
		<tr>
			<td>Status</td>
			<td>{state}</td>
		</tr>
		<tr>
			<td>
				<button on:click={setTrue}>setTrue</button>
			</td>
			<td>
				<button on:click={() => setFalse()}>setFalse</button>
			</td>
		</tr>
		<tr>
			<td>
				<button on:click={toggle}>Toggle</button>
			</td>
		</tr>
	</table>
</LogicState>

