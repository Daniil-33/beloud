import { createRouter, createWebHistory } from 'vue-router'

import Auth from '@/views/Auth.vue'
import Home from '@/views/Home.vue'
import Library from '@/views/Library.vue'
import Navigator from '@/views/Navigator.vue'
import Playlists from '@/views/Playlists.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			name: 'Home',
			path: '/',
			component: Home,
		},
		{
			name: 'Library',
			path: '/library',
			component: Library,
		},
		{
			name: 'Navigator',
			path: '/navigator',
			component: Navigator,
		},
		{
			name: 'Auth',
			path: '/auth',
			component: Auth,
		},
		{
			name: 'Playlists',
			path: '/playlists',
			component: Playlists,
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