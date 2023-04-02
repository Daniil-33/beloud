import router from './router/router'

class Interceptor {
	constructor(router) {
		this.router = router
	}

	interceptRequest(requestConfig) {
		return this.router.call(requestConfig.url, requestConfig.method, requestConfig.params, requestConfig.data)
	}
}

export default new Interceptor(router)