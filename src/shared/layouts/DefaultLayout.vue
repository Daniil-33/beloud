<template>
	<div class="w-100 h-screen overflow-y-scroll" style="padding-bottom: 120px;">
		<Header />

		<v-container>
			<div class="ml-5 mt-5">
				<slot></slot>
			</div>
		</v-container>

		<slot name="player" />
	</div>
</template>
<script>
import Header from '../components/widgets/Header.vue';

export default {
	name: 'DefaultLayout',
	components: {
		Header
	},
}
</script>
<style scoped>
	.overflow-y-scroll{
		overflow-y: scroll;
	}
</style>