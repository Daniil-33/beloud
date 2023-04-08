export default {
	getUserPlayLists: {
		url: '/user/playlists/',
		method: 'GET',
	},
	createUserPlayList: {
		url: '/user/playlist/',
		method: 'POST',
	},
	deleteUserPlayList: {
		url: '/user/playlist/',
		method: 'DELETE',
	},
	addAudioToUserPlayList: {
		url: '/user/playlist/audio',
		method: 'POST',
	},
	deleteAudioFromUserPlayList: {
		url: '/user/playlist/audio',
		method: 'DELETE',
	},
	getUserLikedAudios: {
		url: '/user/liked',
		method: 'GET',
	},
	addUserLikedAudio: {
		url: '/user/liked/',
		method: 'POST',
	},
	deleteUserLikedAudio: {
		url: '/user/liked/',
		method: 'DELETE',
	},
}