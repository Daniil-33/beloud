import { createRouter, createWebHistory } from 'vue-router'

import Auth from '@/views/Auth.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			name: 'Auth',
			path: '/auth',
			component: Auth,
		}
	],
})

import { useAuthModule } from '@/modules/Auth/'

router.beforeEach(async (to, from) => {
	const { isAuth } = useAuthModule()

	debugger
	if (
	  // make sure the user is authenticated
	  !isAuth.value &&
	  // ❗️ Avoid an infinite redirect
	  to.name !== 'Auth'
	) {
	  // redirect the user to the login page
	  return { name: 'Auth' }
	}
  })

export default router