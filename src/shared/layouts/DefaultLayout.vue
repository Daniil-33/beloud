<template>
	<div class="w-100 h-screen overflow-hidden">
		<Header />

		<div class="ml-5 mt-5">
			<slot></slot>
		</div>
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