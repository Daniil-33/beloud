import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useApplicationStore = defineStore('application', () => {
	const appNotifications = reactive([])

	const addNotify = (payload) => {
		let notify = {
			status: true,
			timeout: 2000,
			...payload,
		}

		appNotifications.push(notify)
	}

	const addSuccessNotify = (payload = {}) => {
		let notify = {
			color: 'success',
			...payload,
		}

		addNotify(notify)
	}

	const addErrorNotify = (payload = {}) => {
		let notify = {
			color: 'error',
			timeout: 3000,
			...payload,
		}

		addNotify(notify)
	}

	return {
		appNotifications,

		addErrorNotify,
		addSuccessNotify,
	}

})
