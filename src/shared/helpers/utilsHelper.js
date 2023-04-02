export function stringifyData(data) {
	if (!['string', 'number', 'undefined'].includes(typeof data)) {
		return JSON.stringify(data)
	} else {
		return data
	}
}

export function parseData(data) {
	if (['undefined'].includes(typeof data)) {
		return data
	} else {
		return JSON.parse(data)
	}
}

export function arrayToObjectByKey(key, data) {
	return Object.fromEntries(data.map((item) => [item[key], item]))
}

export function clearObjectAttrs(attrs, data) {
	return Object.fromEntries(
		Object.entries(data).filter(([attrName, value]) => !attrs.includes(attrName))
	)
}

export function promiseWrap(func, funcArgs = []) {
	return new Promise(async (resolve, reject) => {
		try {
			const result = await func(...funcArgs)
			resolve(result)
		} catch (error) {
			reject(error)
		}
	})
}

export function removeEmptyObjectAttrs(data) {
	return Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null))
}

export function set(object, key, value) {
	return (object[key] = value)
}

export function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min)) + min
}

export function moveArrayItems(array, indexFrom, indexTo) {
	array.splice(indexTo, 0, array.splice(indexFrom, 1)[0])
}

export function copyObject(object) {
	return JSON.parse(JSON.stringify(object))
}

export function round(number) {
	return Math.round(parseFloat(number) * 100) / 100
}

export function createMicroTask(callback, ms = 0) {
	return setTimeout(() => {
		callback()
	}, ms)
}

export function getId() {
	return Math.random().toString(36).substr(2, 9)
}