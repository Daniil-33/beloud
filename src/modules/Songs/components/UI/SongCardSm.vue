<template>
	<div
		class="playlist__list-item-number"
		:style="`color: ${cardData.status === 'up' ? '#00E492': '#FE4773'}`"
	>
		<ui-icon
			:icon="cardData.status === 'up' ? 'caret-up'  :'caret-down'"
		/>
	</div>

	<div class="playlist__list-item-image">
		<img :src="cardData.image" alt="">

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

	<div class="playlist__list-item-data">
		<div class="playlist__list-item-data-inner">
			<div class="playlist__list-item-name">{{ cardData.title }}</div>
			<div class="playlist__list-item-group">
				{{ cardData.author }}
				<div class="playlist__list-item-time-mobile"></div>
			</div>
		</div>
	</div>
	<div class="playlist__list-item-time"></div>
</template>
<script>
import UIIcon from '@/shared/components/ui/UIIcon.vue';

export default {
	name: 'SongCardSm',
	components: {
		'ui-icon': UIIcon,
	},
	props: {
		cardData: {
			type: Object,
			required: true
		},
		isPlaying: {
			type: Boolean,
			required: true
		},
		isCurrent: {
			type: Object,
			required: true
		},
		index: {
			type: Number,
			required: true
		}
	},
	emits: {
		play: null,
		pause: null,
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