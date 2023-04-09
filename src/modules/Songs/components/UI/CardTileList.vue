<template>

	<div class="main-grid p-x">
		<div
			class="main-grid-item"
			v-for="(item, index) in items"
			:key="index"
		>	
			<slot :item="item" :index="index"></slot>
		</div>
	</div>
</template>
<script>

export default {
	name: 'CardTileList',
	props: {
		items: {
			type: Array,
			required: true,
			default: () => []
		}
	},
}
</script>