import Player from './components/Player.vue';
import { usePlayerStore as playerStore } from './stores/playerStore';

import { storeToRefs } from 'pinia';

const usePlayerStoreWrap = () => {
	const store = playerStore();

	const {
		playSong,
		setStream,
		startSong,
		pauseSong,
	} = store;

	const {
		currentSong,
		isPlaying,
	} = storeToRefs(store);

	return {
		playSong,
		setStream,
		currentSong,
		isPlaying,
		startSong,
		pauseSong,
	}
}

export {
	Player,
	usePlayerStoreWrap as usePlayerStore
}