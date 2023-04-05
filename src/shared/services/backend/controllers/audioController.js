import audios from "../staticData/audios"

const RANDOM_AUDIO_COUNT = 20

const random20Audios = () => {
	let maxAudioIndex = audios.length - 1
	let selection = []

	for (let i = 0; i < RANDOM_AUDIO_COUNT; i++) {
		let randomAudioIndex = Math.floor(Math.random() * maxAudioIndex)
		selection.push(audios[randomAudioIndex])
	}

	return selection
}

export default {
	getAudio(params, data) {
		if (Object.hasOwnProperty.call(params, "id")) {
			return audios.find((audio) => audio.id === params.id)
		}

		let filteredAudios = audios

		if (Object.hasOwnProperty.call(params, "genre")) {
			filteredAudios = filteredAudios.filter((audio) => audio.genres.includes(params.genre))
		}

		if (Object.hasOwnProperty.call(params, "tag")) {
			filteredAudios = filteredAudios.filter((audio) => audio.tags.includes(params.tag))
		}

		if (Object.hasOwnProperty.call(params, "search")) {
			filteredAudios = filteredAudios.filter((audio) => audio.name.includes(params.search))
		}

		return filteredAudios
	},
	getPopularAudio() {
		return random20Audios()
	},
}