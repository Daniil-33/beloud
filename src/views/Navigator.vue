<template>
	<div class="home__swiper mt-15">
		<div class="title">
			На основі ваших
			<div class="accent-text">Вподобань</div>
			.
		</div>
		<MayLikeSongs />
	</div>

	<div class="home__swiper mt-15">
		<div class="title">
			Топ
			<div class="accent-text">Чарт</div>
			.
		</div>
		<TopChartSongs />
	</div>

	<div class="home__swiper mt-15">
		<div class="title mb-8">
			Щось
			<div class="accent-text">Нове</div>
			.
		</div>
		<PopularNowSongs />
	</div>
</template>
<script>
import { TopChartSongs, MayLikeSongs, PopularNowSongs, RecentlyListenedSongs } from '@/modules/Songs/'
export default {
	components: {
		TopChartSongs,
		MayLikeSongs,
		PopularNowSongs,
		RecentlyListenedSongs,
	},
}
</script>