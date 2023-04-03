<template>
	<v-sheet class="d-flex justify-center">
		<v-btn-toggle v-model="selectedGenre">
			<v-btn v-for="(item) in genresList" :key="item.value" :value="item.value" class="bg-dark" color="secondary" selected-class="genre-btn--active">
				{{item.title}}
			</v-btn>
		</v-btn-toggle>
	</v-sheet>
	<div class="home__swiper mt-15">
		<div class="title">
			Something
			<div class="accent-text">Popular</div>
			.
		</div>
		<Swiper :items="songs"></Swiper>
	</div>
	<div class="home__swiper mt-15">
		<div class="title">
			Something
			<div class="accent-text">New</div>
			.
		</div>
		<Swiper :items="songs"></Swiper>
	</div>
	<div class="home__swiper mt-15">
		<div class="title mb-8">
			Just
			<div class="accent-text">BeLoud</div>
			.
		</div>
		<div class="main-grid">
			<SongCard  v-for="(item, index) in songs.slice(0,8)" :key="index" :cardData="item"></SongCard>
		</div>
	</div>
	
	
</template>
<script>
import SongCard from '@/shared/components/UI/SongCard.vue'
import Swiper from '@/shared/components/UI/Swiper.vue'
import SongImage from '@/assets/images/song-image.jpg'
import { ref } from 'vue'
export default {
	
	components:{
		SongCard,
		Swiper,
	},
	setup() {
		const songs= ref([
			{
				title:'Smells Like Teen Spirit ',
				groupName:'Nirvana',
				image: SongImage
			},
			{
				title:'Smells Like Teen Spirit',
				groupName:'Nirvana 2',
				image: SongImage
			},
			{
				title:'Smells Like Teen Spirit ',
				groupName:'Nirvana 3',
				image: SongImage
			},
			{
				title:'Smells Like Teen Spirit',
				groupName:'Nirvana 5',
				image: SongImage
			},
			{
				title:'Smells Like Teen Spirit ',
				groupName:'Nirvana 6',
				image: SongImage
			},
			{
				title:'Smells Like Teen Spirit ',
				groupName:'Nirvana 7',
				image: SongImage
			},
			{
				title:'Smells Like Teen Spirit ',
				groupName:'Nirvana 8',
				image: SongImage
			},
			{
				title:'Smells Like Teen Spirit ',
				groupName:'Nirvana 9',
				image: SongImage
			},
			{
				title:'Smells Like Teen Spirit ',
				groupName:'Nirvana 4',
				image: SongImage
			},
			{
				title:'Smells Like Teen Spirit ',
				groupName:'Nirvana 4',
				image: SongImage
			},
		])
		const genresList = ref([
			{
				title:'Pop',
				value:'Pop'
			},
			{
				title:'Rock',
				value:'Rock'
			},
			{
				title:'Jazz',
				value:'Jazz'
			},
			{
				title:'Hip-Hop',
				value:'Hip-Hop'
			},
			{
				title:'Classic',
				value:'Classic'
			},
			{
				title:'Folk',
				value:'Folk'
			},
			{
				title:'Indie',
				value:'Indie'
			},
		])
		const selectedGenre = ref(genresList.value[0].value)
		
		return {
			songs,
			genresList,
			selectedGenre
		}
	},

	mounted() {
	}

}
</script>
<style lang="scss" scoped>
	.swiper-container{
		padding: 0 100px;
	}


</style>
