import audioController from "../../controllers/audioController"

export default [
	{
		url: '/audio',
		method: 'GET',
		handler: audioController.getAudio,
	},
	{
		url: '/audio/popular',
		method: 'GET',
		handler: audioController.getPopularAudio,
	},
	{
		url: '/audio/user-may-like',
		method: 'GET',
		handler: audioController.getPopularAudio,
	}
]