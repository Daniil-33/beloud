<template>
	<Loader
		:loading="loadingFlags.loadingUserMayLikeAudio"
	>
		<CardSwiper
			:items="userMayLikeLoadedAudio"
		>
			<template #default="{ item }">
				<SongCard
					:cardData="item"
					:isPlaying="isPlaying"
					:isCurrent="currentSong && currentSong.id === item.id"
					@click="onSongClick(item)"
					@play="startSong"
					@pause="pauseSong"
				/>
			</template>
		</CardSwiper>
	</Loader>
</template>
<script>
import SongCard from './UI/SongCard.vue'
import CardSwiper from './UI/CardSwiper.vue'
import Loader from '../../../shared/components/UI/Loader.vue'

import useAudio from '../composables/useAudio'
import { usePlayerStore } from '@/modules/Player/'
import { useUserModule } from '@/modules/User/index'

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

		const {
			addRecentlyListenedAudio
		} = useUserModule()

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
			setStream(userMayLikeLoadedAudio.value);
			addRecentlyListenedAudio(song.id)
		}

		getUserMayLikeAudio()

		return {
			loadingFlags,
			userMayLikeLoadedAudio,

			onSongClick,
			currentSong,
			isPlaying,
			startSong,
			pauseSong,
		};
	}
}
</script>