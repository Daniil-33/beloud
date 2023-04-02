import ApiService from '../api/';
import { clientStorageLocal } from '@/shared/helpers/clientStorageHelper';
import { LOCAL_STORAGE_AUTH_ACCESS_TOKEN_KEY, LOCAL_STORAGE_AUTH_REFRESH_TOKEN_KEY } from '@/shared/consts/clientStorageKeys';

import { useAuthStore } from '../store/authStore';
import { useApplicationStore } from '@/shared/stores/applicationStore';

import { useRouter, useRoute } from 'vue-router'

export default function useAuth() {
	const { setAuthAccessToken, setAuthRefreshToken } = useAuthStore();
	const { addErrorNotify, addSuccessNotify } = useApplicationStore();

	const router = useRouter();

	const tryAutoLogin = () => {
		const accessToken = clientStorageLocal.get(LOCAL_STORAGE_AUTH_ACCESS_TOKEN_KEY);
		const refreshToken = clientStorageLocal.get(LOCAL_STORAGE_AUTH_REFRESH_TOKEN_KEY);

		if (accessToken && refreshToken) {
			setAuthAccessToken(accessToken);
			setAuthRefreshToken(refreshToken);

			router.push({ name: 'Home' })
			return true;
		}

		return false;
	}

	const login = async ({ email, password }) => {
		ApiService.request('login', {
			data: {
				email,
				password
			}
		})
			.then(
				({ accessToken, refreshToken, user }) => {
					saveAuthTokens({ accessToken, refreshToken });
					addSuccessNotify({
						text: 'Login successful.'
					});
				},
				(error) => addErrorNotify({
					text: error?.message || 'Login failed, please try again later.'
				})
			)
	};

	const register = async ({ name, email, password }) => {
		ApiService.request('register', {
			data: {
				name,
				email,
				password
			}
		})
			.then(
				() => login({ email, password }),
				(error) => addErrorNotify({
					text: error?.message || 'Register failed, please try again later.'
				})
			)
	};

	const logout = () => {
		clientStorageLocal.remove(LOCAL_STORAGE_AUTH_ACCESS_TOKEN_KEY);
		clientStorageLocal.remove(LOCAL_STORAGE_AUTH_REFRESH_TOKEN_KEY);

		setAuthAccessToken(null);
		setAuthRefreshToken(null);
	};

	const saveAuthTokens = ({ accessToken, refreshToken }) => {
		clientStorageLocal.add(LOCAL_STORAGE_AUTH_ACCESS_TOKEN_KEY, accessToken);
		clientStorageLocal.add(LOCAL_STORAGE_AUTH_REFRESH_TOKEN_KEY, refreshToken);

		setAuthAccessToken(accessToken);
		setAuthRefreshToken(refreshToken);

		router.push({ name: 'Home' })
	};

	return {
		tryAutoLogin,
		register,
		login,
		logout
	}
}