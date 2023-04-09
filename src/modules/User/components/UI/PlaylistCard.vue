<template>
	<div class="playlist-card pa-2">
		<div class="playlist-card__image-wrapper">
			<div
				class="playlist-card__image-inner"
				:class="{ 'image--default': !image }"
			>
				<img v-if="image" :src="image">

				<ui-icon v-else icon="playlist"/>
			</div>
		</div>
		<div class="playlist-card__body">
			<div class="playlist-card__body-title">{{cardData.name}}</div>
			<div class="playlist-card__body-wrapper">
                <div class="playlist-card__body-songs">{{ songsCount }} songs</div>
            </div>
		</div>
	</div>
</template>
<script>
import UIIcon from '@/shared/components/ui/UIIcon.vue';
import { computed } from 'vue';

export default {
	name: 'SongCard',
	components: {
		'ui-icon': UIIcon
	},
    props:{
		cardData: {
			type: Object,
			required: true
		}
	},
	setup(props) {
		const songsCount = computed(() => props.cardData.audios.length)
		const image = computed(() => props.cardData.audios?.[0]?.image)

		return {
			songsCount,
			image
		};
	}
}
</script>
<style lang="scss">
.image--default {
	background-color: rgb(var(--v-theme-secondary));

	& div {
		top: 50%;
		left: 50%;
		text-align: center;
		transform: translate3d(-50%, -50%, 0);
		position: relative;
	}
}
</style>