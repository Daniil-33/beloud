<template>
	<div class="song-card__wrapper">
		<div class="song-card pa-2" :class="{ active: isActive }">
			<div class="song-card__image-wrapper">
				<div class="song-card__image-inner">
					<img :src="cardData.image">
					<div v-if="isActive" class="song-card__play">
						<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M29.1822 13.6949L2.93026 0.569061C2.70784 0.45832 2.46085 0.40617 2.21264 0.417547C1.96444 0.428925 1.72325 0.503453 1.5119 0.634077C1.30055 0.764702 1.12602 0.947101 1.00485 1.16401C0.883682 1.38092 0.81987 1.62516 0.819458 1.87362V28.1253C0.81995 28.3737 0.883813 28.6179 1.005 28.8347C1.1262 29.0516 1.30071 29.234 1.51204 29.3646C1.72336 29.4952 1.96452 29.5697 2.21269 29.5811C2.46086 29.5926 2.70784 29.5405 2.93026 29.4298L29.1822 16.304C29.4239 16.1824 29.6271 15.996 29.769 15.7656C29.911 15.5353 29.9861 15.27 29.9861 14.9994C29.9861 14.7289 29.911 14.4636 29.769 14.2333C29.6271 14.0029 29.4239 13.8165 29.1822 13.6949ZM3.73634 25.7652V4.23364L25.2683 14.9994L3.73634 25.7652Z" fill="white"/>
						</svg>
					</div>
				</div>
			</div>
			<div class="song-card__body">
				<div class="song-card__body-title">
					{{cardData.title}}
					
					<!-- <marquee-text>
					</marquee-text> -->
				</div>
				<div class="song-card__body-group">{{cardData.author}}</div>
			</div>
		</div>
	</div>
</template>
<script>
import MarqueeText from 'vue-marquee-text-component'
export default {
	name: 'SongCard',
	components:{
		MarqueeText
	},
    props: {
		cardData: {
			type: Object,
			required: true,
			default: () => ({})
		}
	},
	setup() {
		let isActive=false;
		return {
			isActive
		};
	}
}
</script>
<style scoped>
	
	/* .song-card__wrapper{
		position:relative
	} */
</style>