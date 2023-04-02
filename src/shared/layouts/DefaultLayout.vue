<template>
	<div class="w-100 h-screen overflow-hidden">
		<Header />

		<v-container>
			<div class="ml-5 mt-5">
				<slot></slot>
			</div>
		</v-container>
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