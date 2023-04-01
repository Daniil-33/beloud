export const clientStorageLocal = {

	get(key) {
		const data = window.localStorage.getItem(key);
		if (!data) return;
		try {
			return JSON.parse(data);
		} catch (e) {
			return data;
		}
	},

	add(key, data) {
		window.localStorage.setItem(key, JSON.stringify(data));
	},

	remove(key) {
		window.localStorage.removeItem(key);
	},

	wipe() {
		window.localStorage.clear();
	},

};
export const clientStorageSession = {

	get(key) {
		const data = window.sessionStorage.getItem(key);
		if (!data) return;
		try {
			return JSON.parse(data);
		} catch (e) {
			return data;
		}
	},

	add(key, data) {
		window.sessionStorage.setItem(key, JSON.stringify(data));
	},

	remove(key) {
		window.sessionStorage.removeItem(key);
	},
	wipe() {
		window.sessionStorage.clear();
	},

};

