<template>
	<Loader
		:loading="loadingFlags.loadingUserRecentlyListenedAudios"
	>
		<template v-if="userRecentlyListenedAudios.length">
			<CardSwiper
				:items="userRecentlyListenedAudios"
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
		</template>
		<template v-else>
			<div class="text-center">
				<p style="padding-top: 100px;" class="text-center w-100">Немає недавно прослуханих пісень</p>
			</div>
		</template>
	</Loader>
</template>
<script>
import SongCard from './UI/SongCard.vue'
import CardSwiper from './UI/CardSwiper.vue'
import Loader from '@/shared/components/UI/Loader.vue'

import { usePlayerStore } from '@/modules/Player/'
import { useUserModule } from '@/modules/User/index'

export default {
	name: 'RecentlyListenedSongs',
	components: {
		SongCard,
		CardSwiper,
		Loader
	},
	setup() {
		const {
			playSong,
			setStream,
			currentSong,
			isPlaying,
			startSong,
			pauseSong,
		} = usePlayerStore()

		const {
			loadingFlags,
			userRecentlyListenedAudios,

			getUserRecentlyListenedAudios,
		} = useUserModule()

		const onSongClick = (song) => {
			playSong(song);
			setStream(userRecentlyListenedAudios.value);
		}

		getUserRecentlyListenedAudios()

		return {
			loadingFlags,
			userRecentlyListenedAudios,

			onSongClick,
			currentSong,
			isPlaying,
			startSong,
			pauseSong,
		};
	}
}
</script>