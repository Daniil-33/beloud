// Styles
import '@mdi/font/css/materialdesignicons.css'
// import '@/assets/scss/styles.scss'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

const myCustomLightTheme = {
	dark: false,
	colors: {
		primary: '#F6D68D',
		secondary: '#262A35',
		accent: '#FE4773',
		success: '#42A162',
		warning: '#EAB631',
		error: '#EA4C42',
		background: '#191A1F',
		backgroundSecondary: 'rgb(38, 42, 53)',
		surface: '#191A1F',
		limpid: '#00000000',
		white: '#EFEFEF',
		textSecondary: "#B6BBC2",
		textMuted: "#86919D",
		textSecondary700: "#576674",
		textSecondary800:  "#3F464E",
		textBody: "#1D2126",
		transparent: "#1D2126"
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
