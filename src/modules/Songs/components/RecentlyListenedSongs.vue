<template>
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
				<div class="playlist__list-item pr" v-for="(item1, index1) in item" :key="item1">
                    <div class="playlist__list-item-number" :style="`${index1===0?'color: #00E492;':''} ${index1===2?'color: #FE4773;':''}`">{{index1+1}}.</div>
                    <div class="playlist__list-item-image">
                        <img src="/images/song-image.jpg" alt="">
                    </div>
                    <div class="playlist__list-item-data">
                        <div class="playlist__list-item-data-inner">
                            <div class="playlist__list-item-name">Smells Like Teen Spirit</div>
                            <div class="playlist__list-item-group">
                                Nirvana
                                <div class="playlist__list-item-time-mobile">
                                    3:25
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="playlist__list-item-time">
                        3:25
                    </div>
                </div>
			</div>
		</template>
	</CardSwiper>
</template>
<script>
import SongCard from './UI/SongCard.vue'
import CardSwiper from './UI/CardSwiper.vue'

import { useUserModule } from '@/modules/User/'

import { ref } from 'vue'

export default {
	name: 'RecentlyListenedSongs',
	props: {
		songs: {
			type: Array,
			required: true,
			default: () => []
		}
	},
	components: {
		SongCard,
		CardSwiper
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
			loadingFlags,
		} = useUserModule()
		
		function sliceIntoChunks(arr, chunkSize) {
			const res = [];
			for (let i = 0; i < arr.length; i += chunkSize) {
				const chunk = arr.slice(i, i + chunkSize);
				res.push(chunk);
			}
			return res;
		}
		let sliceSongs = sliceIntoChunks(songs.value, 3)
		console.log('sliceSongs', sliceSongs);
		return {
			songs,
			sliceSongs
		};
	}
}
</script>