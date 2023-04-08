<template>
	<Loader
		:loading="loadingFlags.loadingPopularAudio"
	>
		<CardTileList :items="popularLoadedAudio" >
			<template #default="{ item, index }">
				<SongCard
					:cardData="item"
					@click="onSongClick(item)"
				/>
			</template>
		</CardTileList>
	</Loader>
</template>
<script>
import CardTileList from './UI/CardTileList.vue'
import SongCard from './UI/SongCard.vue'
import Loader from './UI/Loader.vue'

import useAudio from '../composables/useAudio'
import { usePlayerStore } from '@/modules/Player/'

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

		const {
			playSong,
			setStream,
		} = usePlayerStore()

		const onSongClick = (song) => {
			playSong(song);
			setStream(popularLoadedAudio);
		}

		getPopularAudio()

		return {
			onSongClick,

			loadingFlags,
			popularLoadedAudio,
			getPopularAudio,
		};
	}
}
</script>