<template>
	<v-sheet class="d-flex justify-center">
		<v-btn-toggle v-model="selectedGenre">
			<v-btn v-for="(item) in genresList" :key="item.value" :value="item.value" class="bg-dark" color="secondary"
				selected-class="genre-btn--active">
				{{ item.title }}
			</v-btn>
		</v-btn-toggle>
	</v-sheet>
	<div class="home__swiper mt-15">
		<div class="title">
			Recently
			<div class="accent-text">Listened</div>
			.
		</div>
		<!-- <Swiper :items="songs"></Swiper> -->
		<RecentlyListened />
	</div>
	<div class="home__swiper mt-15">
		<div class="title">
			You may
			<div class="accent-text">Like</div>
			.
		</div>
		<MayLikeSongs />
	</div>
	<div class="home__swiper mt-15">
		<div class="title mb-8">
			Popular
			<div class="accent-text">Now</div>
			.
		</div>
		<div class="main-grid">
			<PopularNowSongs />
		</div>
	</div>
</template>
<script>
import { RecentlyListened, MayLikeSongs, PopularNowSongs } from '@/modules/Songs/'

import { ref } from 'vue'

export default {
	name: 'HomeView',
	components: {
		RecentlyListened,
		MayLikeSongs,
		PopularNowSongs,
	},
	setup() {
		const genresList = ref([
			{
				title: 'Pop',
				value: 'Pop'
			},
			{
				title: 'Rock',
				value: 'Rock'
			},
			{
				title: 'Jazz',
				value: 'Jazz'
			},
			{
				title: 'Hip-Hop',
				value: 'Hip-Hop'
			},
			{
				title: 'Classic',
				value: 'Classic'
			},
			{
				title: 'Folk',
				value: 'Folk'
			},
			{
				title: 'Indie',
				value: 'Indie'
			},
		])
		const selectedGenre = ref(genresList.value[0].value)

		return {
			genresList,
			selectedGenre
		}
	},

	mounted() {
	}

}
</script>
<style lang="scss" scoped>
.swiper-container {
	padding: 0 100px;
}
</style>
