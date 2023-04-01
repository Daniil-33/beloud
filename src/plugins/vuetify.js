// Styles
import '@mdi/font/css/materialdesignicons.css'
// import '@/assets/scss/styles.scss'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

const myCustomLightTheme = {
	dark: false,
	colors: {
		primary: '#2979FF',
		secondary: '#D9E3EE',
		accent: '#EA5D31',
		success: '#42A162',
		warning: '#EAB631',
		error: '#EA4C42',
		background: '#EDF1F2',
		limpid: '#00000000',
		white: '#ffffff',
		textSecondary: "#B6BBC2",
		textMuted: "#86919D",
		textSecondary700: "#576674",
		textSecondary800:  "#3F464E",
		textBody: "#1D2126"
	}
}

export default createVuetify({
	theme: {
		defaultTheme: 'myCustomLightTheme',
		themes: {
		  myCustomLightTheme,
		}
	}
})
