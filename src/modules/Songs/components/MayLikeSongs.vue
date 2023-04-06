<template>
	<Loader
		:loading="loadingFlags.loadingUserMayLikeAudio"
	>
		<CardSwiper
			:items="userMayLikeLoadedAudio"
		>
			<template #default="{ item }">
				<SongCard :cardData="item"></SongCard>
			</template>
		</CardSwiper>
	</Loader>
</template>
<script>
import SongCard from './UI/SongCard.vue'
import CardSwiper from './UI/CardSwiper.vue'
import Loader from './UI/Loader.vue'

import useAudio from '../composables/useAudio'

export default {
	name: 'MayLikeSongs',
	components: {
		SongCard,
		CardSwiper,
		Loader
	},
	setup() {
		const {
			loadingFlags,
			userMayLikeLoadedAudio,
			getUserMayLikeAudio,
		} = useAudio()

		getUserMayLikeAudio()

		return {
			loadingFlags,
			userMayLikeLoadedAudio,
		};
	}
}
</script>