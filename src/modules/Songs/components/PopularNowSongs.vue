<template>
	<Loader
		:loading="loadingFlags.loadingPopularAudio"
	>
		<CardTileList :items="popularLoadedAudio" >
			<template #default="{ item, index }">
				<SongCard :cardData="item"/>
			</template>
		</CardTileList>
	</Loader>
</template>
<script>
import CardTileList from './UI/CardTileList.vue'
import SongCard from './UI/SongCard.vue'
import Loader from './UI/Loader.vue'

import useAudio from '../composables/useAudio'

export default {
	name: 'PopularNowSongs',
	components: {
		CardTileList,
		SongCard,
		Loader,
	},
	setup() {
		const {
			loadingFlags,
			popularLoadedAudio,
			getPopularAudio
		} = useAudio()

		getPopularAudio()

		return {
			loadingFlags,
			popularLoadedAudio,
			getPopularAudio
		};
	}
}
</script>