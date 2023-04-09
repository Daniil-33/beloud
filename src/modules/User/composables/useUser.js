import ApiService from '../api/';
import { clientStorageLocal } from '@/shared/helpers/clientStorageHelper';
import { LOCAL_STORAGE_AUTH_ACCESS_TOKEN_KEY } from '@/shared/consts/clientStorageKeys';

import { ref, reactive } from 'vue';

export default function useUser() {
	const accessToken = clientStorageLocal.get(LOCAL_STORAGE_AUTH_ACCESS_TOKEN_KEY);
	ApiService.setAccessToken(accessToken)

	const loadingFlags = reactive({
		loadingUserPlayList: false,
		loadingUserPlayLists: false,
		creatingUserPlayList: false,
		deletingUserPlayList: false,
		addingAudioToUserPlayList: false,
		deletingAudioFromUserPlayList: false,

		loadingUserLikedAudios: false,
		addingUserLikedAudio: false,
		deletingUserLikedAudio: false,

		loadingUserRecentlyListenedAudios: false,
	});

	const userLoadedPlayList = ref(null);
	const userPlayLists = ref([]);
	const userLikedAudios = ref([]);
	const userRecentlyListenedAudios = ref([]);

	const getUserPlaylist = (id) => {
		loadingFlags.loadingUserPlayList = true;

		return ApiService.request('getUserPlayLists', {
			params: {
				id
			}
		})
			.then((playlist) => userLoadedPlayList.value = playlist)
			.catch((error) => console.log(error))
			.finally(() => loadingFlags.loadingUserPlayList = false);
	}

	const getUserPlayLists = () => {
		loadingFlags.loadingUserPlayLists = true;

		return ApiService.request('getUserPlayLists', {})
			.then((playlists) => userPlayLists.value = playlists)
			.catch((error) => console.log(error))
			.finally(() => loadingFlags.loadingUserPlayLists = false);
	}

	const createUserPlayList = (name) => {
		loadingFlags.creatingUserPlayList = true;

		return ApiService.request('createUserPlayList', {
			data: {
				name
			}
		})
			.catch((error) => console.log(error))
			.finally(() => loadingFlags.creatingUserPlayList = false);
	};

	const deleteUserPlayList = (id) => {
		loadingFlags.deletingUserPlayList = true;

		return ApiService.request('deleteUserPlayList', {
			params: {
				playlistId: id
			}
		})
			.then(() => getUserPlayLists())
			.catch((error) => console.log(error))
			.finally(() => loadingFlags.deletingUserPlayList = false);
	};

	const addAudioToUserPlayList = (playlistId, audioId) => {
		loadingFlags.addingAudioToUserPlayList = true;

		return ApiService.request('addAudioToUserPlayList', {
			data: {
				playlistId,
				audioId
			}
		})
			.then(() => getUserPlayLists())
			.catch((error) => console.log(error))
			.finally(() => loadingFlags.addingAudioToUserPlayList = false);
	};

	const deleteAudioFromUserPlayList = (playlistId, audioId) => {
		loadingFlags.deletingAudioFromUserPlayList = true;

		return ApiService.request('deleteAudioFromUserPlayList', {
			data: {
				playlistId,
				audioId
			}
		})
			.then(() => getUserPlayLists())
			.catch((error) => console.log(error))
			.finally(() => loadingFlags.deletingAudioFromUserPlayList = false);
	};

	const getUserLikedAudios = () => {
		loadingFlags.loadingUserLikedAudios = true;

		return ApiService.request('getUserLikedAudios', {})
			.then((audios) => userLikedAudios.value = audios)
			.catch((error) => console.log(error))
			.finally(() => loadingFlags.loadingUserLikedAudios = false);
	};

	const addUserLikedAudio = (audioId) => {
		loadingFlags.addingUserLikedAudio = true;

		return ApiService.request('addUserLikedAudio', {
			data: {
				audioId
			}
		})
			.then(() => getUserLikedAudios())
			.catch((error) => console.log(error))
			.finally(() => loadingFlags.addingUserLikedAudio = false);
	};

	const deleteUserLikedAudio = (audioId) => {
		loadingFlags.deletingUserLikedAudio = true;

		return ApiService.request('deleteUserLikedAudio', {
			data: {
				audioId
			}
		})
			.then(() => getUserLikedAudios())
			.catch((error) => console.log(error))
			.finally(() => loadingFlags.deletingUserLikedAudio = false);
	};

	const getUserRecentlyListenedAudios = () => {
		loadingFlags.loadingUserRecentlyListenedAudios = true;

		return ApiService.request('getUserRecentlyListenedAudio', {})
			.then((audios) => userRecentlyListenedAudios.value = audios)
			.catch((error) => console.log(error))
			.finally(() => loadingFlags.loadingUserRecentlyListenedAudios = false);
	}

	const addRecentlyListenedAudio = (audioId) => {
		return ApiService.request('addUserRecentlyListenedAudio', {
			data: {
				audioId
			}
		})
			.then(() => getUserRecentlyListenedAudios())
			.catch((error) => console.log(error))
	}

	return {
		loadingFlags,
		userLoadedPlayList,
		userPlayLists,
		userLikedAudios,
		userRecentlyListenedAudios,

		getUserPlaylist,
		getUserPlayLists,
		createUserPlayList,
		deleteUserPlayList,
		addAudioToUserPlayList,
		deleteAudioFromUserPlayList,

		getUserLikedAudios,
		addUserLikedAudio,
		deleteUserLikedAudio,

		getUserRecentlyListenedAudios,
		addRecentlyListenedAudio,
	};
}