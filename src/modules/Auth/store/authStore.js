import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
	state: () => ({
		accessToken: null,
		refreshToken: null,
	}),
	actions: {
		setAuthAccessToken(token) {
			this.accessToken = token;
		},
		setAuthRefreshToken(token) {
			this.refreshToken = token;
		}
	},
	getters: {
		isAuth: (state) => !!state.accessToken,
	}
});