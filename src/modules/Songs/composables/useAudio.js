import ApiService from '../api/';
import { clientStorageLocal } from '@/shared/helpers/clientStorageHelper';
import { LOCAL_STORAGE_AUTH_ACCESS_TOKEN_KEY } from '@/shared/consts/clientStorageKeys';

import { ref, reactive } from 'vue';

export default function useSongs() {
	const accessToken = clientStorageLocal.get(LOCAL_STORAGE_AUTH_ACCESS_TOKEN_KEY);
	ApiService.setAccessToken(accessToken)

	const singleLoadedAudio = ref(null);
	const filteredLoadedAudio = ref([]);
	const popularLoadedAudio = ref([]);
	const userMayLikeLoadedAudio = ref([]);

	const loadingFlags = reactive({
		loadingSingleAudio: false,
		loadingFilteredAudio: false,
		loadingPopularAudio: false,
		loadingUserMayLikeAudio: false,
	});

	const getAudioById = (id) => {
		loadingFlags.loadingSingleAudio = true;

		ApiService.request('getAudio', {
			params: {
				id
			}
		})
			.then((audio) => singleLoadedAudio.value = audio)
			.catch((error) => console.log(error))
			.finally(() => loadingFlags.loadingSingleAudio = false);
	};

	const getAudioFiltered = async ({ genre, tag, search }) => {
		loadingFlags.loadingFilteredAudio = true;

		ApiService.request('getAudio', {
			params: {
				...(genre && { genre } || {}),
				...(tag && { tag } || {}),
				...(search && { search } || {}),
			}
		})
			.then((audios) => filteredLoadedAudio.value = audios)
			.catch((error) => console.log(error))
			.finally(() => loadingFlags.loadingFilteredAudio = false);
	};

	const getPopularAudio = () => {
		loadingFlags.loadingPopularAudio = true;

		ApiService.request('getPopularAudio', {})
			.then((audios) => popularLoadedAudio.value = audios)
			.catch((error) => console.log(error))
			.finally(() => loadingFlags.loadingPopularAudio = false);
	};

	const getUserMayLikeAudio = () => {
		loadingFlags.loadingUserMayLikeAudio = true;

		ApiService.request('getUserMayLikeAudio', {})
			.then((audios) => userMayLikeLoadedAudio.value = audios)
			.catch((error) => console.log(error))
			.finally(() => loadingFlags.loadingUserMayLikeAudio = false);
	}

	return {
		loadingFlags,

		singleLoadedAudio,
		filteredLoadedAudio,
		popularLoadedAudio,
		userMayLikeLoadedAudio,

		getAudioById,
		getAudioFiltered,
		getPopularAudio,
		getUserMayLikeAudio
	};
}