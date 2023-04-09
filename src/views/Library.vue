<template>
	<Search></Search>
	<!-- <v-sheet /class="d-flex justify-center search-wrapper"> -->
	<!-- </v-sheet> -->
	<div class="title mb-8 mt-9">
		That’s only yours
		<div class="accent-text">Library</div>
		.
	</div>

	<div class="dropdown-block">
		<div class="dropdown-block__header">
			<div class="dropdown-block__header-title">Songs</div>
			<div class="dropdown-block__header-button">View all</div>
		</div>
		<div class="dropdown-block__body pl">
			<div class="main-grid">
				<div class="main-grid-item" v-for="(item, index) in songs" :key="index" >
					<SongCard :cardData="item"></SongCard>
				</div>
			</div>
		</div>
	</div>
	<div class="dropdown-block mt-8">
		<div class="dropdown-block__header">
			<div class="dropdown-block__header-title">Playlists</div>
			<div class="dropdown-block__header-button">Hide</div>
		</div>
		<div class="dropdown-block__body pl">
			<div class="main-grid">
				<div class="main-grid-item" v-for="(item, index) in playlists" :key="index" >
					<PlaylistCard :cardData="item"></PlaylistCard>
				</div>
			</div>
		</div>
	</div>
	
</template>
<script>
import SongCard from '@/shared/components/UI/SongCard.vue'
import PlaylistCard from '@/shared/components/UI/PlaylistCard.vue'
import Search from '@/shared/components/UI/Search.vue'
import PlaylistImage from '@/assets/images/playlist-image.jpg'
import { ref } from 'vue'
export default {
	
	components:{
		SongCard,
		Search,
		PlaylistCard
	},
	setup() {
		const songs = ref([
			{
				title:'Smells Like Teen Spirit ',
				groupName:'Nirvana',
				image: '/images/song-image.jpg'
			},
			{
				title:'Smells Like Teen Spirit',
				groupName:'Nirvana 2',
				image: '/images/song-image.jpg'
			},
			{
				title:'Smells Like Teen Spirit ',
				groupName:'Nirvana 3',
				image: '/images/song-image.jpg'
			},
			{
				title:'Smells Like Teen Spirit',
				groupName:'Nirvana 5',
				image: '/images/song-image.jpg'
			},
			{
				title:'Smells Like Teen Spirit ',
				groupName:'Nirvana 6',
				image: '/images/song-image.jpg'
			},
			{
				title:'Smells Like Teen Spirit ',
				groupName:'Nirvana 7',
				image: '/images/song-image.jpg'
			},
			{
				title:'Smells Like Teen Spirit ',
				groupName:'Nirvana 8',
				image: '/images/song-image.jpg'
			},
			{
				title:'Smells Like Teen Spirit ',
				groupName:'Nirvana 9',
				image: '/images/song-image.jpg'
			},
			{
				title:'Smells Like Teen Spirit ',
				groupName:'Nirvana 4',
				image: '/images/song-image.jpg'
			},
			{
				title:'Smells Like Teen Spirit ',
				groupName:'Nirvana 4',
				image: '/images/song-image.jpg'
			},
		])
		const playlists = ref([
			{
				title: 'Playlist: AC/DC',
				groupName: 'Nirvana',
				image: PlaylistImage,
				songsCount: 10
			},
			{
				title: 'Playlist: AC/DC',
				groupName: 'Nirvana',
				image: PlaylistImage,
				songsCount: 10
			},
			{
				title: 'Playlist: AC/DC ewqeqwrqrqwewqeqwewq',
				groupName: 'Nirvana',
				image: PlaylistImage,
				songsCount: 10
			},
			{
				title: 'Playlist: AC/DC',
				groupName: 'Nirvanawqewqewqeqweqwewqesdadsdqwewqerqwe',
				image: PlaylistImage,
				songsCount: 10
			},
			{
				title: 'Playlist: AC/DC',
				groupName: 'Nirvana',
				image: PlaylistImage,
				songsCount: 10
			},
			{
				title: 'Playlist: AC/DC',
				groupName: 'Nirvana',
				image: PlaylistImage,
				songsCount: 10
			},
			{
				title: 'Playlist: AC/DC',
				groupName: 'Nirvana',
				image: PlaylistImage,
				songsCount: 10
			},
		])
		
		return {
			songs,
			playlists
		}
	},


}
</script>
<style lang="scss" scoped>
	


</style>
