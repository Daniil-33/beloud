<template>
	<div class="playlist-card pa-2">
		<div class="playlist-card__image-wrapper">
			<div class="playlist-card__image-inner">
				<img :src="cardData.image">
			</div>
		</div>
		<div class="playlist-card__body">
			<div class="playlist-card__body-title">{{cardData.title}}</div>
			<div class="playlist-card__body-wrapper">
                <div class="playlist-card__body-group">{{cardData.groupName}}</div>
                <div class="playlist-card__body-songs">{{cardData.songsCount}} songs</div>
            </div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'SongCard',
    props:['cardData'],
	// setup() {
	// 	const navigationLinks = [
	// 		{
	// 			title: 'Home',
	// 			to: '/',
	// 		},
	// 		{
	// 			title: 'Library',
	// 			to: '/library',
	// 		},
	// 		{
	// 			title: 'Navigator',
	// 			to: '/navigator',
	// 		},
	// 	]
	// 	return {
	// 		navigationLinks
	// 	};
	// }
}
</script>
<style scoped>

</style>