const REQUEST_DELAY = 1500;

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

		return new Promise((resolve, reject) => {
			setTimeout(() => resolve(route.handler(params, data)), REQUEST_DELAY);
		})
	}
}
