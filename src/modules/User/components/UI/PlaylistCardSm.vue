<template>
	<div class="playlist-card-sm">
		<div>
			<img v-if="cardData.image" :src="cardData.image" alt="">
			<div v-else class="playlist-card-sm__image-placeholder">
				<ui-icon icon="playlist-sm" />
			</div>
		</div>

		<div class="playlist-card-sm__info">
			<div class="playlist-card-sm__info-title">{{ cardData.name }}</div>
			<div class="playlist-card-sm__info-songs">{{ cardData.songsCount }} songs</div>
		</div>
	</div>
</template>
<script>
import UIIcon from '@/shared/components/ui/UIIcon.vue';

export default {
	name: 'PlaylistCardSm',
	components: {
		'ui-icon': UIIcon
	},
	props: {
		cardData: {
			type: Object,
			required: true
		}
	}
}
</script>
<style lang="scss">
.playlist-card-sm {
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	cursor: pointer;

	& img {
		max-width: 70px;
	}

	&__image-placeholder {
		width: 70px;
		height: 70px;
		background-color: rgb(var(--v-theme-secondary));
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 4px;
	}

	&__info {
		max-width: calc(100% - 70px);
		padding-left: 10px;


		&-title {
			font-size: 16px;
			font-weight: 500;
			color: rgb(var(--v-theme-white));
			margin-right: 8px;

			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			margin-bottom: 10px;
		}

		&-songs {
			font-size: 14px;
			font-weight: 400;
			color: rgb(var(--v-theme-primary));
		}
	}
}
</style>