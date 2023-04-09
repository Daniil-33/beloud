<template>
	<div class="loader">
		<slot></slot>

		<div v-if="loading" class="loader__loading-inner">
			<v-progress-circular indeterminate color="accent"></v-progress-circular>
		</div>
	</div>
</template>
<script>
export default {
	name: 'OverlayLoader',
	props: {
		loading: {
			type: Boolean,
			default: false
		}
	},
}
</script>
<style scoped lang="scss">
	.loader {
		width: 100%;
		position: relative;

		&__loading-inner {
			height: 100%;
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;
			display: flex;
			align-items: center;
			justify-content: center;

			background-color: rgba($color: #000000, $alpha: 0.5);
		}
	}
</style>