<template>
	<div class="player" v-if="isPlayerVisible">
		<v-container class="h-100">
			<div class="player__content">
				<div class="player__content-song-details">
					<div class="player__content-song-info">
						<div class="player__content-song-name text-h5">
							{{ currentSong.title }}
						</div>
						<div class="player__content-song-artist text-body accent-text-flat">
							{{ currentSong.author }}
						</div>
					</div>
				</div>
				<div class="player__content-main-controls">
					<ui-icon
						icon="prev"
						@click="moveToPrev"
					></ui-icon>

					<div>
						<ui-icon
							:icon="isPlaying ? 'pause' : 'play'"
							@click="togglePlay"
						></ui-icon>
					</div>

					<ui-icon
						icon="next"
						@click="moveToNext"
					></ui-icon>
				</div>
				<div class="player__content-secondary-controls">
					<div class="player__content-duration text-body">
						{{ formattedCurrentTime(currentTime) }} / {{ formattedCurrentTime(duration) }}
					</div>

					<div class="player__content-volume">
						<ui-icon class="mr-1" style="height: 30px;" icon="volume"></ui-icon>

						<div class="player__content-volume-slider">
							<v-slider
								color="accent"
								:model-value="volume"
								:min="0"
								:max="100"
								:step="1"
								@update:model-value="setVolume"
							></v-slider>
						</div>
					</div>

					<ui-icon
						icon="repeat"
						class="player__content-repeat"
						:class="{ 'active': isRepeat }"
						@click="toggleRepeat"
					></ui-icon>
				</div>
			</div>
		</v-container>
	</div>
</template>
<script>
import UIIcon from '@/shared/components/ui/UIIcon.vue';
import { usePlayerStore } from '../stores/playerStore';
import { storeToRefs } from 'pinia'

export default {
	name: 'Player',
	components: {
		'ui-icon': UIIcon,
	},
	setup() {

		const {
			currentSong,
			stream,
			currentSongIndexInStream,
			canMoveToPrev,
			canMoveToNext,
			isPlayerVisible,
			isPlaying,
			isRepeat,
			currentTime,
			duration,
			volume,
		} = storeToRefs(usePlayerStore())

		const {
			playSong,
			startSong,
			pauseSong,
			setVolume,

			setStream,
			moveToPrev,
			moveToNext,
			toggleRepeat
		} = usePlayerStore();

		const togglePlay = () => {
			if (isPlaying.value) {
				pauseSong();
			} else {
				startSong();
			}
		}

		const formattedCurrentTime = () => {
			const minutes = Math.floor(currentTime.value / 60);
			const seconds = Math.floor(currentTime.value % 60);

			return `${minutes}:${seconds}`;
		}

		return {
			currentSong,
			stream,
			currentSongIndexInStream,
			canMoveToPrev,
			canMoveToNext,
			isPlayerVisible,
			isPlaying,
			isRepeat,
			currentTime,
			duration,
			volume,

			togglePlay,
			setVolume,

			setStream,
			moveToPrev,
			moveToNext,
			toggleRepeat,

			formattedCurrentTime
		}
	}
}
</script>
<style lang="scss">
.player {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100px;
	background-color: #262A35;
	z-index: 100;

	&__content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100%;
		width: 100%;

		&-main-controls {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;

			& * {
				cursor: pointer;
				transition: all 0.1s linear;
			}

			& *:not(:last-child) {
				margin-right: 60px;
			}

			& *:hover {
				color: rgb(var(--v-theme-accent));
			}
		}

		&-secondary-controls {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;

		}

		&-duration {
			margin-right: 30px;
		}

		&-volume {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-right: 30px;
			// height: 100%;

			&-slider {
				max-width: 120px;
				min-width: 120px;
				width: 100%;

				& .v-input__details {
					display: none;
				}
			}
		}

		&-repeat {
			cursor: pointer;
			transition: all 0.1s linear;

			&:hover {
				color: rgb(var(--v-theme-accent));
			}
		}
	}
}
</style>