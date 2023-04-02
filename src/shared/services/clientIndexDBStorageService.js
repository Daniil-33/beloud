import { idb } from '../helpers/indexDBHelper'

import { DB_NAME, DB_VERSION, STORES_SCHEMA, STORE_MAP, STORES_METHODS_MAP } from "@/shared/config/clientIndexDBStorageConfig"
import { stringifyData, parseData } from '@/shared/helpers/utilsHelper'

// Private methods to communicate with data base
function _initStorages(DB) {
	Object.entries(STORES_SCHEMA).forEach(([storeName, fields]) => {
		idb.createStore(DB, storeName, {
			keyPath: fields.KEY
		})
	})
}

async function _initEngine() {
	const DB = await idb.openDB(DB_NAME, DB_VERSION, {
		onUpgradeNeeded: _initStorages
	})

	return DB
}

async function _getFromStorage(DB, storeName, key) {
	try {
		const rawData = await idb.getByKeyPath(DB, storeName, key)
		return rawData?.[STORES_SCHEMA[storeName].DATA]
	} catch (error) {
		console.error(error)
		return null
	}
}

async function _setToStorage(DB, storeName, key, value) {
	try {
		return await idb.storeAction(DB, storeName, {
			action: 'put',
			object: {
				[STORES_SCHEMA[storeName].KEY]: key,
				[STORES_SCHEMA[storeName].DATA]: value
			}
		})
	} catch (error) {
		console.error(error)
	}
}

// Private methods to communicate with storages

function _getUserData(DB, key) {
	return _getFromStorage(DB, STORE_MAP.USER_DATA, key)
}

function _setUserData(DB, key, data) {
	return _setToStorage(DB, STORE_MAP.USER_DATA, key, data)
}

function _getFromPlaylists(DB, key) {
	return _getFromStorage(DB, STORE_MAP.PLAYLISTS, key)
}

function _setToPlaylists(DB, key, data) {
	return _setToStorage(DB, STORE_MAP.PLAYLISTS, key, data)
}


// Export of function which returns cache engine interface, using private methods
// Methods of this interface includes additional data transforming and data checking before sending it to base, or getting data from it
export default async function() {
	const DataBase = await _initEngine()

	async function getUserData(key) {
		return _getUserData(DataBase, key)
	}

	async function setUserData(key, data) {
		return _setUserData(DataBase, key, data)
	}

	async function getFromPlaylists(key) {
		const result = await _getFromPlaylists(DataBase, key)
		const transformedData = parseData(result)

		return transformedData
	}

	async function setToPlaylists(key, data) {
		const transformedData = stringifyData(data)
		const result = await _setToPlaylists(DataBase, key, transformedData)

		return result
	}

	return {
		[STORES_METHODS_MAP[STORE_MAP.USER_DATA].GET]: getUserData,
		[STORES_METHODS_MAP[STORE_MAP.USER_DATA].SET]: setUserData,
		[STORES_METHODS_MAP[STORE_MAP.PLAYLISTS].GET]: getFromPlaylists,
		[STORES_METHODS_MAP[STORE_MAP.PLAYLISTS].SET]: setToPlaylists,
	}
}