import Auth from './components/Auth.vue'
import { useAuthStore } from './store/authStore'

import { computed } from 'vue'

const useAuthModule = () => {
	const authStore = useAuthStore()
	const isAuth = computed(() => authStore.isAuth)

	return {
		isAuth
	}
}

export {
	Auth,
	useAuthModule
}