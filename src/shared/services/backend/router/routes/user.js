import userController from "../../controllers/userController";

export default [
	{
		url: '/user/playlists/',
		method: 'GET',
		handler: userController.getPlayLists,
	},
	{
		url: '/user/playlist/',
		method: 'POST',
		handler: userController.createPlayList,
	},
	{
		url: '/user/playlist/',
		method: 'DELETE',
		handler: userController.removePlayList,
	},
	{
		url: '/user/playlist/audio',
		method: 'POST',
		handler: userController.addAudioToPlayList,
	},
	{
		url: '/user/playlist/audio',
		method: 'DELETE',
		handler: userController.removeAudioFromPlayList,
	},
	{
		url: '/user/liked',
		method: 'GET',
		handler: userController.getLikedAudios,
	},
	{
		url: '/user/liked/',
		method: 'POST',
		handler: userController.likeAudio,
	},
	{
		url: '/user/liked/',
		method: 'DELETE',
		handler: userController.unlikeAudio,
	},
]