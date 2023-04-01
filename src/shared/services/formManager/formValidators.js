export function required(value) {
    return !!value
}

export function email(value) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
}

export function minLength(value, length) {
    return value.length >= length
}

export function maxLength(value, length) {
    return value.length <= length
}

export function betweenLength(value, minLength, maxLength) {
    return value.length <= maxLength && value.length >=minLength
}

export function beforeDate(value, before=Date.now()) {
    return new Date(value) <= before
}