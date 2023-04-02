import { createRouter, createWebHistory } from 'vue-router'

import Auth from '@/views/Auth.vue'
import Navigator from '@/views/Navigator.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			name: 'Navigator',
			path: '/',
			component: Navigator,
		},
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