import { createI18n } from 'vue-i18n'

import getBrowserLocale from '@/shared/helpers/i18n/get-browser-locale'
import { supportedLocalesInclude } from '@/shared/helpers/i18n/supported-locales'

import ru from '@/assets/locales/ru.json'

import { LOCAL_STORAGE_LOCALE_KEY } from '@/shared/consts/clientStorageKeys'
import { clientStorageLocal } from '@/shared/helpers/clientStorageHelper'

export function getStartingLocale() {
	let currentLocale = clientStorageLocal.get(LOCAL_STORAGE_LOCALE_KEY)

	if (currentLocale) {

		return currentLocale

	} else {

		const browserLocale = getBrowserLocale({ countryCodeOnly: true })

		if (supportedLocalesInclude(browserLocale)) {
			return browserLocale
		} else {
			return import.meta.env.VITE_APP_I18N_LOCALE || 'ru'
		}

	}
}

export const startingLocale = getStartingLocale()

const i18n = createI18n({
	legacy: false,
	locale: import.meta.env.VITE_APP_I18N_FALLBACK_LOCALE || 'ru',
	fallbackLocale: import.meta.env.VITE_APP_I18N_FALLBACK_LOCALE || 'ru',
	messages: {
		ru,
	},
	warnHtmlInMessage: 'off',
})

// Set new locale.
export async function setLocale(localeKey) {
	// Load locale if not available yet.
	if (!i18n.global.availableLocales.includes(localeKey)) {
		const messages = await loadLocale(localeKey)

		// fetch() error occurred.
		if (messages === undefined) {
			return
		}

		// Add locale.
		i18n.global.setLocaleMessage(localeKey, messages)
	}

	// Set locale.
	i18n.global.locale.value = localeKey

	clientStorageLocal.add(LOCAL_STORAGE_LOCALE_KEY, localeKey)

	document.querySelector('html').setAttribute('lang', localeKey)
}

// Fetch locale
function loadLocale(locale) {
	return fetch(`/locales/${locale}.json`)
		.then((response) => {
			if (response.ok) {
				return response.json()
			}
			throw new Error('Something went wrong!')
		})
		.catch((error) => {
			console.error(error)
		})
}

export default i18n
