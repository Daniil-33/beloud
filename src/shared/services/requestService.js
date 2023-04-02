import Interceptor from './backend/backendService';

import axios from 'axios'

const defaultRequestConfig = {
	method: 'GET',
	url: '',
	params: null,
	data: null,
	headers: {
		'Content-Type': 'application/json'
	},
}

export default class RequestService {
	constructor(accessToken) {
		this._accessToken = accessToken;
	}

	isAccessTokenExist() {
		return !!this._accessToken;
	};

	setAccessToken(accessToken) {
		this._accessToken = accessToken;
	};

	request(options) {
		const requestConfig = {
			...defaultRequestConfig,
			...options
		};

		return Interceptor.interceptRequest(requestConfig)

		return new Promise((resolve, reject) => {
			axios(requestConfig)
				.then((res) => {
					resolve(res.data)
				})
				.catch((error) => {
					reject(error)
				})
		})
	};
}
