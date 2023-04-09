<template>
	<div class="song-card__wrapper">
		<div class="song-card pa-2" :class="{ active: isCurrent }">
			<div class="song-card__image-wrapper">
				<div class="song-card__image-inner">
					<img :src="cardData.image">
				</div>
			</div>
			<div class="song-card__body">
				<div class="song-card__body-title">
					{{cardData.title}}
				</div>

				<div class="song-card__body-group">{{cardData.author}}</div>
			</div>

			<div v-if="isCurrent" class="song-card__active-overlay">
				<div
					class="song-card__active-overlay-inner"
					@click.stop="toggleState"
				>
					<ui-icon
						:icon="isPlaying ? 'pause' : 'play'"
					></ui-icon>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import UIIcon from '@/shared/components/ui/UIIcon.vue';

export default {
	name: 'SongCard',
	components: {
		'ui-icon': UIIcon
	},
    props: {
		cardData: {
			type: Object,
			required: true,
			default: () => ({})
		},
		isPlaying: {
			type: Boolean,
			required: true,
			default: false
		},
		isCurrent: {
			type: Boolean,
			required: true,
			default: false
		}
	},
	emits: {
		play: null,
		pause: null
	},
	setup(props, { emit }) {
		const toggleState = () => {
			if (props.isPlaying) {
				emit('pause')
			} else {
				emit('play')
			}
		}

		return {
			toggleState
		}
	}
}
</script>