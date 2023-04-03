<template>
	<CardTileList :items="songs" >
		<template #default="{ item, index }">
			<SongCard :cardData="item"/>
		</template>
	</CardTileList>
</template>
<script>
import CardTileList from './UI/CardTileList.vue'
import SongCard from './UI/SongCard.vue'

import { ref } from 'vue'

export default {
	name: 'PopularNowSongs',
	components: {
		CardTileList,
		SongCard
	},
	setup() {
		const songs = ref([
			{
				title: 'Smells Like Teen Spirit ',
				groupName: 'Nirvana',
				image: '/images/song-image.jpg'
			},
			{
				title: 'Smells Like Teen Spirit',
				groupName: 'Nirvana 2',
				image: '/images/song-image.jpg'
			},
			{
				title: 'Smells Like Teen Spirit ',
				groupName: 'Nirvana 3',
				image: '/images/song-image.jpg'
			},
			{
				title: 'Smells Like Teen Spirit',
				groupName: 'Nirvana 5',
				image: '/images/song-image.jpg'
			},
			{
				title: 'Smells Like Teen Spirit ',
				groupName: 'Nirvana 6',
				image: '/images/song-image.jpg'
			},
			{
				title: 'Smells Like Teen Spirit ',
				groupName: 'Nirvana 7',
				image: '/images/song-image.jpg'
			},
			{
				title: 'Smells Like Teen Spirit ',
				groupName: 'Nirvana 8',
				image: '/images/song-image.jpg'
			},
			{
				title: 'Smells Like Teen Spirit ',
				groupName: 'Nirvana 9',
				image: '/images/song-image.jpg'
			},
			{
				title: 'Smells Like Teen Spirit ',
				groupName: 'Nirvana 4',
				image: '/images/song-image.jpg'
			},
			{
				title: 'Smells Like Teen Spirit ',
				groupName: 'Nirvana 4',
				image: '/images/song-image.jpg'
			},
		])

		return {
			songs
		};
	}
}
</script>