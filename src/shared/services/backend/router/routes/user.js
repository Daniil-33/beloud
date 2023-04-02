import userController from "../../controllers/userController";

export default [
	{
		url: '/user/playlists',
		method: 'GET',
		handler: userController.getPlayLists,
	},
	{
		url: '/user/playlist',
		method: 'POST',
		handler: userController.createPlayList,
	},
	{
		url: '/user/playlist/',
		method: 'DELETE',
		handler: userController.removePlayList,
	},
	{
		url: '/user/liked',
		method: 'GET',
		handler: userController.getLikedAudios,
	},
	{
		url: '/user/liked/add',
		method: 'POST',
		handler: userController.likeAudio,
	},
	{
		url: '/user/liked/remove',
		method: 'POST',
		handler: userController.unlikeAudio,
	},
	{
		url: '/user/playlist/add-audio',
		method: 'POST',
		handler: userController.addAudioToPlayList,
	},
	{
		url: '/user/playlist/delete-audio',
		method: 'POST',
		handler: userController.removeAudioFromPlayList,
	},
	{
		url: '/user/may-like/',
		method: 'GET',
		handler: userController.getMayLikeAudios,
	},
]