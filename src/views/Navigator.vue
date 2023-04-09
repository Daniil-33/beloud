<template>
	<div class="home__swiper mt-15">
		<div class="title">
			На основі ваших <span class="accent-text">Вподобань</span>.
		</div>
		<MayLikeSongs />
	</div>

	<div class="home__swiper mt-15">
		<div class="title">
			Топ <span class="accent-text">Чарт</span>.
		</div>
		<TopChartSongs />
	</div>

	<div class="home__swiper mt-15">
		<div class="title mb-8">
			Щось <span class="accent-text">Нове</span>.
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