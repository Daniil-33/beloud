import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { debounce } from 'lodash'

const createAudio = (url, { onEnd, onReady, onPause, onPlay  }) => {
	const audio = new Audio(url)

	audio.addEventListener('canplaythrough', onReady)

	audio.addEventListener('play', onPlay);

	audio.addEventListener('pause', onPause);

	audio.addEventListener('ended', onEnd);

	return audio
}

export const usePlayerStore = defineStore('player', () => {
	const currentSong = ref(null)
	const currentAudio = ref(null)
	const isPlaying = ref(false)
	const currentTime = ref(0)
	const duration = ref(0)
	const volume = ref(100)
	const checker = ref(null)
	const isRepeat = ref(false)

	const stream = ref([])

	const currentSongIndexInStream = computed(() => stream.value.findIndex(song => song.id === currentSong.value.id))
	const canMoveToPrev = computed(() => currentSongIndexInStream.value > 0)
	const canMoveToNext = computed(() => currentSongIndexInStream.value < stream.value.length - 1)
	const isPlayerVisible = computed(() => currentSong.value !== null)

	const playSong = (song) => {
		if (currentAudio.value?.id === song.id) return;

		if (currentAudio.value) {
			currentAudio.value.pause();
		}

		currentSong.value = song;

		const moveToNextHandler = () => {
			if (isRepeat.value) {
				setCurrentTime(0);
				startSong();
			} else {
				moveToNext();
			}
		};

		currentAudio.value = createAudio(song.file, {
			onEnd: () => moveToNextHandler(),
			onReady: () => startSong(),
			onPause: () => pauseSong(),
			onPlay: () => startSong()
		})

		setVolume(volume.value);
	}

	const setStream = (songs) => {
		stream.value = songs;
	}

	const startSong = () => {
		if (!currentAudio.value) return;

		isPlaying.value = true;
		currentAudio.value.play();
		duration.value = currentAudio.value.duration;

		checker.value = setInterval(() => {
			currentTime.value = currentAudio.value.currentTime;
		}, 1000)
	}

	const pauseSong = () => {
		if (!currentAudio.value || !isPlaying.value) return;

		isPlaying.value = false;
		currentAudio.value.pause();

		clearInterval(checker.value);
	}

	const moveToPrev = () => {
		if (!canMoveToPrev.value) return;

		const prevSong = stream.value[currentSongIndexInStream.value - 1];
		playSong(prevSong);
	}

	const moveToNext = () => {
		if (!canMoveToNext.value) return;

		const nextSong = stream.value[currentSongIndexInStream.value + 1];
		playSong(nextSong);
	}

	const setVolume = (value) => {
		if (!currentAudio.value) return;

		const volumeInPercent = value / 100;

		volume.value = value;
		currentAudio.value.volume = volumeInPercent;
	}

	const toggleRepeat = () => {
		isRepeat.value = !isRepeat.value;
	}

	const applyCurrentTime = debounce((value) => {
		currentAudio.value.currentTime = value;
	}, 100)

	const setCurrentTime = (value) => {
		if (!currentAudio.value) return;

		currentTime.value = value;
		applyCurrentTime(value);
	}

	return {
		currentSong,
		stream,
		currentSongIndexInStream,
		canMoveToPrev,
		canMoveToNext,
		isPlayerVisible,
		isPlaying,
		currentTime,
		duration,
		volume,
		isRepeat,

		playSong,
		startSong,
		pauseSong,
		setVolume,

		setStream,
		moveToPrev,
		moveToNext,
		toggleRepeat,
		setCurrentTime
	}
})
