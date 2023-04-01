export function getParam(routeObject, paramName) {
    return routeObject.query[paramName]
}

export function setParam(routerObject, [paramName, paramValue]) {
    routerObject.push({ query: {
        [paramName]: paramValue
    }})
}

export function addParams(routerObject, newParams, currentParams) {
    // console.log(routerObject, newParams, currentParams)
    routerObject.push({ query: {
        ...currentParams,
        ...newParams,
    }})
}

export function getAllParams(routeObject) {
    return { ...routeObject.query }
}

export function setBulkOfParams(routerObject, paramsEntries) {
    paramsEntries.forEach((entrie) => setParam(routerObject, entrie))
}

export default function(routerObject) {
    const { router, route } = routerObject

    return {
        getAllParams: () => getParam(route, paramName),
        getParam: (paramName) => getParam(route, paramName),
        setParam: (paramName, paramValue) => setParam(router, [paramName, paramValue]),
        addParams: (params) => addParams(router, params, route.query),
        setBulkOfParams: (paramsEntries) => getParam(router, paramsEntries)
    }
}
