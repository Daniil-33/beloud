const indexDB = window.indexedDB ||
	window.mozIndexedDB ||
	window.webkitIndexedDB ||
	window.msIndexedDB ||
	window.shimIndexedDB

function openDB(DBName, DBVersion, options={}) {
	const { onUpgradeNeeded, onSuccess, onError } = options

	return new Promise((resolve, reject) => {
		const openRequest = indexedDB.open(DBName, DBVersion)

		openRequest.onerror = (event) => {
			console.error("An error occurred with IndexedDB")
			console.error(event)

			onError && onError(event)
			reject(null)
		}

		openRequest.onupgradeneeded = (event) => {
			const db = (openRequest.result)

			onUpgradeNeeded && onUpgradeNeeded(db)
			resolve(db)
		}

		openRequest.onsuccess = (event) => {
			const db = openRequest.result

			db.onversionchange = () => {
				db.close();
				alert("Reload the page, please")
			};

			onSuccess && onSuccess(event)
			resolve(db)
		}
	})
}


function createStore(DB, storeName, options={}) {
	const store = DB.createObjectStore(storeName, {...options})
	return store
}

function getByKeyPath(DB, storeName, key) {
	return new Promise((resolve, reject) => {
		const transaction = DB.transaction([storeName], 'readwrite')
		const objectStore = transaction.objectStore(storeName)
		const request = objectStore.get(key)

		request.onerror = (event) => {
			console.error("An error occurred with request")
			console.error(event)

			reject(event)
		}

		request.onsuccess = () => {
			resolve(request.result)
		}
	})
}

function storeAction(DB, storeName, options={}) {
	const { action, object } = options

	return new Promise((resolve, reject) => {
		const transaction = DB.transaction(storeName, "readwrite")
		const objectStore = transaction.objectStore(storeName)
		const request = objectStore[action](object)

		request.onerror = (event) => {
			reject(event)
		}

		request.onsuccess = (event) => {
			resolve(event)
		}
	})
}

export const idb = {
	openDB,
	createStore,
	getByKeyPath,
	storeAction
}
