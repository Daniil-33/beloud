import { createApp } from 'vue'

import { createPinia } from 'pinia'
import router from './router'
import i18n from './plugins/i18n'

import App from './App.vue'

import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

const app = createApp(App)

app.use(vuetify)
app.use(router)
app.use(i18n)
app.use(createPinia())

app.mount('#app')

import { registerSW } from 'virtual:pwa-register'

registerSW({
	immediate: true,
	onNeedRefresh() {
		// show a prompt to user to refresh the app
	},
	onOfflineReady() {
		// show a ready to work offline message to user
	},
})
