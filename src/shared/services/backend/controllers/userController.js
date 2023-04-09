import clientIndexDBStorageService from "../../clientIndexDBStorageService"
import { USER_DATA_KEYS } from '@/shared/config/clientIndexDBStorageConfig'
import { getId } from '@/shared/helpers/utilsHelper'
import audioController from '@/shared/services/backend/controllers/audioController'

const clientStorage = await clientIndexDBStorageService()

export default {
	async createPlayList(params, data) {
		const { name } = data
		const playlistId = getId()
		const playlist = {
			id: playlistId,
			name,
			audios: []
		}

		const userPlaylists = ((await clientStorage.getUserData(USER_DATA_KEYS.PLAYLISTS)) || [])
			.concat(playlistId)

		await clientStorage.setUserData(USER_DATA_KEYS.PLAYLISTS, userPlaylists)
		await clientStorage.setToPlaylists(playlistId, playlist)
	},
	async getPlayLists(params, data) {
		const userPlaylists = await clientStorage.getUserData(USER_DATA_KEYS.PLAYLISTS)
		const playlists = (await Promise.all(userPlaylists.map(id => clientStorage.getFromPlaylists(id)))).filter(Boolean)

		playlists.forEach(playlist => {
			playlist.audios = playlist.audios.map(id => audioController.getAudio({ id }))
		})

		if (params?.id) {
			return playlists.find(playlist => playlist.id === params.id)
		}

		return playlists
	},
	async getPlayList(params, data) {
		const { playlistId } = params
		const playlist = await clientStorage.getFromPlaylists(playlistId)

		playlist.audios = playlist.audios.map(id => audioController.getAudio({ id }))

		return playlist
	},
	async addAudioToPlayList(params, data) {
		const { playlistId, audioId } = data
		const playlist = await clientStorage.getFromPlaylists(playlistId)

		playlist.audios.push(audioId)

		await clientStorage.setToPlaylists(playlistId, playlist)
	},
	async removeAudioFromPlayList(params, data) {
		const { playlistId, audioId } = data
		const playlist = await clientStorage.getFromPlaylists(playlistId)

		playlist.audios = playlist.audios.filter(id => id !== audioId)

		await clientStorage.setToPlaylists(playlistId, playlist)
	},
	async removePlayList(params, data) {
		const { playlistId } = params
		const userPlaylists = await clientStorage.getUserData(USER_DATA_KEYS.PLAYLISTS)

		await clientStorage.setUserData(USER_DATA_KEYS.PLAYLISTS, userPlaylists.filter(id => id !== playlistId))
		await clientStorage.setToPlaylists(playlistId, null)
	},
	async likeAudio(params, data) {
		const { audioId } = data
		const userLiked = ((await clientStorage.getUserData(USER_DATA_KEYS.LIKED)) || [])
			.concat(audioId)

		await clientStorage.setUserData(USER_DATA_KEYS.LIKED, userLiked)
	},
	async unlikeAudio(params, data) {
		const { audioId } = data
		const userLiked = await clientStorage.getUserData(USER_DATA_KEYS.LIKED)

		await clientStorage.setUserData(USER_DATA_KEYS.LIKED, userLiked.filter(id => id !== audioId))
	},
	async getLikedAudios(params, data) {
		const userLiked = await clientStorage.getUserData(USER_DATA_KEYS.LIKED)

		return userLiked.map(id => audioController.getAudio({ id }))
	},
	async getRecentlyPlayedAudios(params, data) {
		const userRecentlyPlayed = await clientStorage.getUserData(USER_DATA_KEYS.RECENTLY_PLAYED)

		return userRecentlyPlayed.map(id => audioController.getAudio({ id }))
	},
	async addRecentlyPlayedAudio(params, data) {
		const { audioId } = data
		let userRecentlyPlayed = ((await clientStorage.getUserData(USER_DATA_KEYS.RECENTLY_PLAYED)) || [])

		if (!userRecentlyPlayed.includes(audioId)) {
			userRecentlyPlayed.splice(0, 0, audioId);
			userRecentlyPlayed = userRecentlyPlayed.slice(0, 20)
		} else {
			return
		}

		await clientStorage.setUserData(USER_DATA_KEYS.RECENTLY_PLAYED, userRecentlyPlayed)
	},
	async getMayLikeAudios(params, data) {
		return audioController.getPopularAudio()
	}
}