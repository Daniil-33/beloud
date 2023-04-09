<template>
	<Loader
		:loading="loadingFlags.loadingTopChatAudio"
	>
		<CardSwiper
			:items="sliceSongs"
			:propsBreakpoints="{
				280:{
					slidesPerView: 1
				},
				1280: {
					slidesPerView: 2,
					spaceBetween: 40
				}
			}"
		>
			<template #default="{ item }">
				<div class="recently-swiper">
					<div
						class="playlist__list-item pr"
						v-for="(song, index) in item"
						:key="song.id"
						@click="onSongClick(song)"
					>
						<SongCardSm
							:cardData="song"
							:isPlaying="isPlaying"
							:isCurrent="currentSong && currentSong.id === song.id"
							:index="index"
							@play="startSong"
							@pause="pauseSong"
						/>
					</div>
				</div>
			</template>
		</CardSwiper>
	</Loader>
</template>
<script>
import SongCardSm from './UI/SongCardSm.vue'
import Loader from '../../../shared/components/UI/Loader.vue'
import CardSwiper from './UI/CardSwiper.vue'

import useAudio from '../composables/useAudio'
import { usePlayerStore } from '@/modules/Player/'
import { useUserModule } from '@/modules/User/index'

import { ref, watch } from 'vue'

export default {
	name: 'TopChartSongs',
	props: {
		songs: {
			type: Array,
			required: true,
			default: () => []
		}
	},
	components: {
		SongCardSm,
		CardSwiper,
		Loader
	},
	setup() {
		const songs = ref([
			{
				title: 'Smells Like Teen Spirit ',
				author: 'Nirvana',
				image: '/images/song-image.jpg'
			},
			{
				title: 'Smells Like Teen Spirit',
				author: 'Nirvana 2',
				image: '/images/song-image.jpg'
			},
			{
				title: 'Smells Like Teen Spirit ',
				author: 'Nirvana 3',
				image: '/images/song-image.jpg'
			},
			{
				title: 'Smells Like Teen Spirit',
				author: 'Nirvana 5',
				image: '/images/song-image.jpg'
			},
			{
				title: 'Smells Like Teen Spirit ',
				author: 'Nirvana 6',
				image: '/images/song-image.jpg'
			},
			{
				title: 'Smells Like Teen Spirit ',
				author: 'Nirvana 7',
				image: '/images/song-image.jpg'
			},
			{
				title: 'Smells Like Teen Spirit ',
				author: 'Nirvana 8',
				image: '/images/song-image.jpg'
			},
			{
				title: 'Smells Like Teen Spirit ',
				author: 'Nirvana 9',
				image: '/images/song-image.jpg'
			},
			{
				title: 'Smells Like Teen Spirit ',
				author: 'Nirvana 4',
				image: '/images/song-image.jpg'
			},
			{
				title: 'Smells Like Teen Spirit ',
				author: 'Nirvana 4',
				image: '/images/song-image.jpg'
			},
		])

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
			topChartLoadedAudio,
			getTopChartAudio
		} = useAudio()

		const {
			addRecentlyListenedAudio,
		} = useUserModule()

		const onSongClick = (song) => {
			debugger
			playSong(song);
			setStream(topChartLoadedAudio.value);
			addRecentlyListenedAudio(song.id);
		}

		function sliceIntoChunks(arr, chunkSize) {
			const res = [];

			for (let i = 0; i < arr.length; i += chunkSize) {
				const chunk = arr.slice(i, i + chunkSize);

				res.push(chunk);
			}

			return res;
		}

		const sliceSongs = ref([])

		getTopChartAudio()

		watch(() => topChartLoadedAudio.value, (newVal) => {
			sliceSongs.value = sliceIntoChunks(newVal, 3)
		})

		return {
			loadingFlags,
			sliceSongs,
			currentSong,
			isPlaying,
			startSong,
			pauseSong,
			onSongClick
		};
	}
}
</script>