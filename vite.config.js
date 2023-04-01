import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import vuetify from 'vite-plugin-vuetify'

import topLevelAwait from 'vite-plugin-top-level-await'

// import { VuetifyProgressiveModule } from 'vuetify-loader'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		vuetify({
			autoImport: true,
			// https://next.vuetifyjs.com/en/features/sass-variables/#component-specific-variables
			// styles: {
			// 	configFile: './src/assets/scss/styles.scss',
			// },
		}),
		topLevelAwait({
			// The export name of top-level await promise for each chunk module
			promiseExportName: '__tla',
			// The function to generate import names of top-level await promise in each chunk module
			promiseImportName: (i) => `__tla_${i}`,
		}),
		// VuetifyProgressiveModule,
		VitePWA({
			manifest: {
				name: 'My App',
				short_name: 'My App',
				icons: [
					{
						src: '/img/icons/android-chrome-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: '/img/icons/android-chrome-512x512.png',
						sizes: '512x512',
						type: 'image/png',
					},
					{
						src: '/img/icons/apple-touch-icon-60x60.png',
						sizes: '60x60',
						type: 'image/png',
					},
					{
						src: '/img/icons/apple-touch-icon-152x152.png',
						sizes: '152x152',
						type: 'image/png',
					},
					{
						src: '/img/icons/apple-touch-icon-180x180.png',
						sizes: '180x180',
						type: 'image/png',
					},
					{
						src: '/img/icons/favicon-16x16.png',
						sizes: '16x16',
						type: 'image/png',
					},
					{
						src: '/img/icons/favicon-32x32.png',
						sizes: '32x32',
						type: 'image/png',
					},
				],
			},
		}),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	css: {
		//   preprocessorOptions: {
		//     scss: {
		//       additionalData: `@import "./src/assets/scss/variables.scss";`
		//     }
		//   }
	},
	server: {
		port: 8088,
	},
})
