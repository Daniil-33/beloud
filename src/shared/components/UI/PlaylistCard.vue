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
	.playlist-card, .song-card *{
		box-sizing: border-box;
	} 
	.playlist-card {
		padding: 10px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 222px;
		border: 1px solid black;
		width: 100%;
	}
	.playlist-card__body-title{
		font-weight: 600;
		font-size: 24px;
		line-height: 32px;
		margin-top: 16px;
	}
	.playlist-card__body-group{
		font-weight: 600;
		font-size: 18px;
		line-height: 24px;
		color: #F6D68D;
	}
	.playlist-card__image-wrapper{
		width: 100%;
		padding-top: 100%;
		position: relative;
		margin-top: 5px;

	}
	.playlist-card__image-inner{
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		border-radius: 10px;
	}
	.playlist-card__image-inner img{
		width: 100%;
		border-radius: 15px;
	}
    .playlist-card__body-wrapper{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .playlist-card__body-songs{
        font-weight: 600;
        font-size: 14px;
        line-height: 24px;
    }
</style>