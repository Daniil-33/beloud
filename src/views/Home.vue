<template>
	<!-- <v-sheet class="d-flex justify-center p-x">
		<div class="w-1280-block w-100">
			<v-btn-toggle v-model="selectedGenre">
				<v-btn v-for="(item) in genresList" :key="item.value" :value="item.value" class="bg-dark" color="secondary"
					selected-class="genre-btn--active">
					{{ item.title }}
				</v-btn>
			</v-btn-toggle>
		</div>
		<div class="w-1280-none w-100">
			<v-select
				v-model="selectedGenre"
				:items="genresList"
				item-title="title"
				item-value="value"
				label="Select"
				persistent-hint
				return-object
				single-line
			></v-select>
		</div>
	</v-sheet> -->
	<div class="home__swiper mt-15">
		<div class="title">
			Нещодавно <span class="accent-text">Прослухані</span>.
		</div>
		<RecentlyListenedSongs />
	</div>
	<div class="home__swiper mt-15">
		<div class="title">
			Вам може <span class="accent-text">Сподобатись</span>.
		</div>
		<MayLikeSongs />
	</div>
	<div class="home__swiper mt-15">
		<div class="title mb-8">
			Популярні <span class="accent-text">Зараз</span>.
		</div>
		<PopularNowSongs />
	</div>
</template>
<script>
import { TopChartSongs, MayLikeSongs, PopularNowSongs, RecentlyListenedSongs } from '@/modules/Songs/'

import { ref } from 'vue'

export default {
	name: 'HomeView',
	components: {
		TopChartSongs,
		MayLikeSongs,
		PopularNowSongs,
		RecentlyListenedSongs,
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

</style>
