import { useApplicationStore } from "@/shared/stores/applicationStore";

export default function useLogger() {
	const { addSuccessNotify, addErrorNotify } = useApplicationStore()

	// UI notifications method
	const pushSuccessNotification = (payload) => {
		addSuccessNotify(payload)
	}

	const pushErrorNotification = (payload) => {
		addErrorNotify(payload)
	}

	// DEBUGGING notifications method
	const debugLog = (logFunction) => {
		if (import.meta.env.VITE_APP_DATA_LAYERS_DEBUG_MODE) {
			logFunction()
		}
	}

	const log = (massage) => {
		console.log(`Logger [DEBUG LOG]: ${massage}`)
	}

	const warning = (message) => {
		console.warn(`Logger [DEBUG WARN]: ${message}`)
	}

	const error = (message) => {
		console.error(`Logger [DEBUG ERROR]: ${message}`)
	}

	return {
		ui: {
			pushSuccessNotification,
			pushErrorNotification
		},
		debug: {
			debugLog,
			log: (message) => debugLog(log.bind(null, message)),
			warning: (message) => debugLog(warning.bind(null, message)),
			error: (message) => debugLog(error.bind(null, message))
		}
	}
}