<template>
	<div class="loader">
		<slot v-if="!loading"></slot>
		<div class="loader__loading-inner" v-else>
			<v-progress-circular indeterminate color="accent"></v-progress-circular>
		</div>
	</div>
</template>
<script>
import SongCard from '../../../modules/Songs/components/UI/SongCard.vue'

export default {
	name: 'Loader',
	components: {
		SongCard
	},
	props: {
		loading: {
			type: Boolean,
			default: false,
		},
	},
	setup() {
		const mock = {
			title: 'Smells Like Teen Spirit ',
			groupName: 'Nirvana',
			image: '/images/song-image.jpg'
		}

		return {
			mock,
		}
	},
}
</script>
<style scoped lang="scss">
.loader {
	width: 100%;
	position: relative;
	min-height: 200px;

	&__loading-inner {
		height: 100%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
</style>