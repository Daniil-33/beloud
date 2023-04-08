import { usePlayerStore } from "../stores/playerStore";

export default function usePlayer() {
	const {
		currentSongIndexInStream,
		stream,
		playSong,
		setStream
	} = usePlayerStore();

	const canMoveToPrev = computed(() => currentSongIndexInStream > 0)
	const canMoveToNext = computed(() => currentSongIndexInStream < stream.value.length - 1)
	const isPlayerVisible = computed(() => currentSong.value !== null)

	const requestPlaySong = (song) => {
		playSong(song);
	}

	const requestSetStream = (stream) => {
		setStream(stream);
	}

	const startSong = () => {
		if (!currentAudio.value) return;

		isPlaying.value = true;
		currentAudio.value.play();

		checker.value = setInterval(() => {
			currentTime.value = currentAudio.value.currentTime;
			duration.value = currentAudio.value.duration;
			volume.value = currentAudio.value.volume * 100;
		}, 100)
	}

	const pauseSong = () => {
		if (!currentAudio.value || !isPlaying.value) return;

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

	const setVolume = (volume) => {
		if (!currentAudio.value) return;

		const volumeValue = volume / 100;

		volume.value = volumeValue;
		currentAudio.value.volume = volumeValue;
	}
}