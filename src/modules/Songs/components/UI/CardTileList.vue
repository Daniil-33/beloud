<template>

	<div class="main-grid p-x">
		<template
			v-for="(item, index) in items"
			:key="index"
		>	
		
			<slot :item="item" :index="index"></slot>
		</template>
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