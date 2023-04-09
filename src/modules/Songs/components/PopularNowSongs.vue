<template>
	<Loader
		:loading="loadingFlags.loadingPopularAudio"
	>
		<CardTileList :items="popularLoadedAudio" >
			<template #default="{ item, index }">
				<SongCard
					:cardData="item"
					:isPlaying="isPlaying"
					:isCurrent="currentSong && currentSong.id === item.id"
					@click="onSongClick(item)"
					@play="startSong"
					@pause="pauseSong"
				/>
			</template>
		</CardTileList>
	</Loader>
</template>
<script>
import CardTileList from './UI/CardTileList.vue'
import SongCard from './UI/SongCard.vue'
import Loader from '../../../shared/components/UI/Loader.vue'

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
			currentSong,
			isPlaying,
			startSong,
			pauseSong,
		} = usePlayerStore()

		const onSongClick = (song) => {
			playSong(song);
			setStream(popularLoadedAudio.value);
		}

		getPopularAudio()

		return {
			onSongClick,
			startSong,
			pauseSong,

			loadingFlags,
			popularLoadedAudio,
			currentSong,
			isPlaying,
			getPopularAudio,
		};
	}
}
</script>