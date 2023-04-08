import { ref, reactive } from 'vue';

export default function useUser() {
	const loadingFlags = reactive({
		loadingUserPlayLists: false,
		creatingUserPlayList: false,
		deletingUserPlayList: false,
		addingAudioToUserPlayList: false,
		deletingAudioFromUserPlayList: false,

		loadingUserLikedAudios: false,
		addingUserLikedAudio: false,
		deletingUserLikedAudio: false,
	});

	const userPlayLists = ref([]);
	const userLikedAudios = ref([]);

	const getUserPlayLists = () => {
		loadingFlags.loadingUserPlayLists = true;

		ApiService.request('getUserPlayLists', {})
			.then((playlists) => userPlayLists.value = playlists)
			.catch((error) => console.log(error))
			.finally(() => loadingFlags.loadingUserPlayLists = false);
	}

	const createUserPlayList = (name) => {
		loadingFlags.creatingUserPlayList = true;

		ApiService.request('createUserPlayList', {
			data: {
				name
			}
		})
			.then(() => getUserPlayLists())
			.catch((error) => console.log(error))
			.finally(() => loadingFlags.creatingUserPlayList = false);
	};

	const deleteUserPlayList = (id) => {
		loadingFlags.deletingUserPlayList = true;

		ApiService.request('deleteUserPlayList', {
			params: {
				id
			}
		})
			.then(() => getUserPlayLists())
			.catch((error) => console.log(error))
			.finally(() => loadingFlags.deletingUserPlayList = false);
	};

	const addAudioToUserPlayList = (playlistId, audioId) => {
		loadingFlags.addingAudioToUserPlayList = true;

		ApiService.request('addAudioToUserPlayList', {
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

		ApiService.request('deleteAudioFromUserPlayList', {
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

		ApiService.request('getUserLikedAudios', {})
			.then((audios) => userLikedAudios.value = audios)
			.catch((error) => console.log(error))
			.finally(() => loadingFlags.loadingUserLikedAudios = false);
	};

	const addUserLikedAudio = (audioId) => {
		loadingFlags.addingUserLikedAudio = true;

		ApiService.request('addUserLikedAudio', {
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

		ApiService.request('deleteUserLikedAudio', {
			data: {
				audioId
			}
		})
			.then(() => getUserLikedAudios())
			.catch((error) => console.log(error))
			.finally(() => loadingFlags.deletingUserLikedAudio = false);
	};

	return {
		loadingFlags,
		userPlayLists,
		userLikedAudios,

		getUserPlayLists,
		createUserPlayList,
		deleteUserPlayList,
		addAudioToUserPlayList,
		deleteAudioFromUserPlayList,

		getUserLikedAudios,
		addUserLikedAudio,
		deleteUserLikedAudio,
	};
}