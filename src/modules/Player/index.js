import Player from './components/Player.vue';
import { usePlayerStore as playerStore } from './stores/playerStore';

const usePlayerStoreWrap = () => {
	const {
		playSong,
		setStream
	} = playerStore();

	return {
		playSong,
		setStream
	}
}

export {
	Player,
	usePlayerStoreWrap as usePlayerStore
}