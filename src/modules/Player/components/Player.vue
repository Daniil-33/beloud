<template>
	<div class="player" v-if="isPlayerVisible">
		<div class="player__progress">
			<v-slider color="accent" :model-value="currentTime" :min="0" :max="duration" :step="1"
				@update:model-value="setCurrentTime"></v-slider>
		</div>

		<div class="player__content">
			<div class="player__content-song-details">
				<div class="player__content-song-info">
					<div class="player__content-song-name text-h5 moving-text" :title="currentSong.title">
						{{ currentSong.title }}
					</div>
					<div class="player__content-song-artist text-body accent-text-flat moving-text">
						{{ currentSong.author }}
					</div>
				</div>

				<div class="player__content-song-details-more">
					<button
						class="icon-btn"
						@click="showAddToPlaylistsModal = true"
					>
						<ui-icon
							icon="plus"
						></ui-icon>
					</button>

					<AddAudioToPlayListModal
						:visible="showAddToPlaylistsModal"
						:audio-id="currentSong.id"
						@update:visible="showAddToPlaylistsModal = $event"
					/>
				</div>
			</div>

			<div class="player__content-main-controls">
				<button
					class="icon-btn"
					:class="{ 'disabled': !canMoveToPrev }"
					@click="moveToPrev"
				>
					<ui-icon
						icon="prev"
					></ui-icon>
				</button>

				<button
					class="icon-btn"
					@click="togglePlay"
				>
					<ui-icon
						:icon="isPlaying ? 'pause' : 'play'"
					></ui-icon>
				</button>

				<button
					class="icon-btn"
					:class="{ 'disabled': !canMoveToNext }"
					@click="moveToNext"
				>
					<ui-icon
						icon="next"
					></ui-icon>
				</button>
			</div>

			<div class="player__content-secondary-controls">
				<div class="player__content-duration text-body">
					{{ formattedCurrentTime(currentTime) }} / {{ formattedCurrentTime(duration) }}
				</div>

				<div class="player__content-volume">
					<ui-icon class="mr-1" style="height: 30px;" icon="volume"></ui-icon>

					<div class="player__content-volume-slider">
						<v-slider color="accent" :model-value="volume" :min="0" :max="100" :step="1"
							@update:model-value="setVolume"></v-slider>
					</div>
				</div>

				<button
					class="icon-btn"
					:class="{ 'active': isRepeat }"
					@click="toggleRepeat"
				>
					<ui-icon
						icon="repeat"
					></ui-icon>
				</button>
			</div>

			<div class="player__content-secondary-controls-mobile">
				<v-menu
					transition="scale-transition"
					:close-on-content-click="false"
				>
					<template v-slot:activator="{ props }">
						<button class="icon-btn" v-bind="props">
							<ui-icon
								icon="caret-left"
							></ui-icon>
						</button>
					</template>

					<div class="player__content-mobile">
						<div class="player__content-song-info-mobile">
							<div class="player__content-song-name text-h5 moving-text" :title="currentSong.title">
								{{ currentSong.title }}
							</div>
							<div class="player__content-song-artist text-body accent-text-flat moving-text">
								{{ currentSong.author }}
							</div>
						</div>

						<div class="player__content-secondary-controls-mobile-wrapper rounded">
							<div class="player__content-duration text-body">
								{{ formattedCurrentTime(currentTime) }} / {{ formattedCurrentTime(duration) }}
							</div>

							<div class="player__content-volume">
								<ui-icon class="mr-1" style="height: 30px;" icon="volume"></ui-icon>

								<div class="player__content-volume-slider">
									<v-slider color="accent" :model-value="volume" :min="0" :max="100" :step="1"
										@update:model-value="setVolume"></v-slider>
								</div>
							</div>

							<button
								class="icon-btn"
								:class="{ 'active': isRepeat }"
								@click="toggleRepeat"
							>
								<ui-icon
									icon="repeat"
								></ui-icon>
							</button>
						</div>
					</div>
				</v-menu>
			</div>
		</div>
	</div>
</template>
<script>
import UIIcon from '@/shared/components/ui/UIIcon.vue';
import AddAudioToPlayListModal from '@/modules/User/components/modals/AddAudioToPlayListModal.vue';
import { usePlayerStore } from '../stores/playerStore';
import { storeToRefs } from 'pinia'
import { ref } from 'vue';

export default {
	name: 'Player',
	components: {
		'ui-icon': UIIcon,
		AddAudioToPlayListModal
	},
	setup() {
		const isMoreMenuVisible = ref(false);
		const showAddToPlaylistsModal = ref(false);

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
			toggleRepeat,
			setCurrentTime,
		} = usePlayerStore();

		const togglePlay = () => {
			if (isPlaying.value) {
				pauseSong();
			} else {
				startSong();
			}
		}

		const formattedCurrentTime = (value) => {
			const minutes = Math.floor(value / 60);
			const seconds = Math.floor(value % 60);

			return `${minutes}:${seconds.toString().length === 1 ? '0' + seconds : seconds}`;
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
			setCurrentTime,

			formattedCurrentTime,
			isMoreMenuVisible,
			showAddToPlaylistsModal,
		}
	}
}
</script>
<style lang="scss">
.moving-text:hover {
	animation-play-state: paused;
}

/* The animation */
@keyframes marquee {
	0% {
		transform: translateX(100%);
	}

	100% {
		transform: translateX(-100%);
	}
}

/* media query to enable animation for only those who want it */
@media (prefers-reduced-motion: no-preference) {
	.moving-text {
		animation: marquee 15s linear infinite;
	}
}

.player {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 70px;
	background-color: #262A35;
	z-index: 100;
	padding: 0 20px;

	&__progress {
		position: absolute;
		top: -15px;
		left: 0;
		width: 100%;
		max-width: 100%;
		z-index: 1;
		overflow: hidden;

		& .v-input {
			margin: 0 !important;
		}

		& .v-input__details {
			display: none;
		}
	}

	&__content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100%;
		width: 100%;
		position: relative;

		&-mobile {
			background-color: rgb(var(--v-theme-background));
			color: rgb(var(--v-theme-white));
			min-width: 340px;
			padding: 8px 10px;
			overflow: hidden;
		}

		&-song-details {
			display: flex;
			align-items: center;
			justify-content: center;

			&-more {
				&-list-item {
					&:hover {
						cursor: pointer;
						transition: all .1s linear;
						background-color: rgba(var(--v-theme-secondary), 0.5);
						color: #fff;
					}
				}
			}
		}

		&-song-info {
			max-width: 250px;
			overflow: hidden;
			margin-right: 10px;

			* {
				white-space: nowrap;
			}
		}

		@media (max-width: 750px) {
			&-song-info {
				max-width: 150px;
			}
		}

		@media (max-width: 550px) {
			&-song-info {
				display: none;
			}

			&-song-info-mobile {
				display: block;
			}
		}

		&-main-controls {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate3d(-50%, -50%, 0);

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

		@media (max-width: 1000px) {
			&-main-controls {
				& *:not(:last-child) {
					margin-right: 20px;
				}
			}
		}

		@media (max-width: 60px) {
			&-main-controls {
				& *:not(:last-child) {
					margin-right: 10px;
				}
			}
		}

		&-secondary-controls {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;

			&-mobile {
				display: none;

				&-wrapper {
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}

		@media (max-width: 1000px) {
			&-secondary-controls {
				display: none;
			}

			&-secondary-controls-mobile {
				display: block;
			}
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