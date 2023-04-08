import routes from './routes'

const REQUEST_DELAY = 5000;

class Router {
	constructor(routes) {
		this.routes = routes
	}

	getRouteAccessByURL(url, method) {
		const route = this.routes.find(route => route.url === url && route.method === method);

		if (!route) {
			throw new Error(`Route with url: ${url} and method ${method} not found`);
		}

		return route;
	}

	call(url, method, params, data) {
		const route = this.getRouteAccessByURL(url, method);

		if (route.handler.constructor.name === 'AsyncFunction') {
			return route.handler(params, data);
		} else {
			return new Promise((resolve, reject) => {
				setTimeout(() => resolve(route.handler(params, data)), REQUEST_DELAY);
			})
		}
	}
}

export default new Router(routes)
