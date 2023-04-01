import { getRndInteger } from "./utilsHelper"
import moment from 'moment'
import 'moment-timezone'
// import 'moment/min/locales.min'
import 'moment/dist/locale/ru';
import 'moment/dist/locale/kk';

export function fdm(number) {//Format Date Number
    const numberStr = number.toString()

    if (numberStr.length < 2) {
        return `0${number}`
    } else {
        return numberStr
    }
}

export function formatDateTime(date) {
    return `${fdm(date.getHours())}:${fdm(date.getMinutes())}`
}

export function formatDateRange(from, to, timezone, locale) {
    moment.locale(locale)

    const dateFrom = moment(from).tz(timezone)
    const dateTo = moment(to).tz(timezone)

    if (!from) {
        return '';
    } else {
        if (!to) {
            return dateFrom.format("DD.MM HH:mm:ss");
        } else {
            if (dateFrom.format('DD.MM') === dateTo.format('DD.MM')) {
                return dateFrom.format("DD MMM") + ' ' + dateFrom.format("HH:mm") + ' / ' + dateTo.format('HH:mm')
            } else {
                return dateFrom.format("DD MMM HH:mm") + ' / ' + dateTo.format('DD MMM HH:mm')
            }
        }

    }
}

export function formatDate(date, timezone, locale, format='DD.MM HH:mm:ss') {
    moment.locale(locale)
    const momentDate = moment(date).tz(timezone)

    return momentDate.format(format)
}

export function randomDate([minYear, maxYear], [minMonth, maxMonth], [minDate, maxDate], [minHours, maxHours], [minMinutes, maxMinutes]) {
    return new Date(
        getRndInteger(minYear, maxYear),
        getRndInteger(minMonth, maxMonth),
        getRndInteger(minDate, maxDate),
        getRndInteger(minHours, maxHours),
        getRndInteger(minMinutes, maxMinutes),
    ).toISOString()
}

export function getDateBorders(dates, timezone, locale) {
    if(!dates.length) return ''

    moment.locale(locale)

    let dateFrom = moment(dates[0]).tz(timezone)
    let dateTo = moment(dates[0]).tz(timezone)

    for(const [index, date] of dates.entries()) {
        const dateObject = moment(date).tz(timezone)

        if (dateObject < dateFrom) dateFrom = dateObject
        if (dateObject > dateTo) dateTo = dateObject
    }

    return {
        from: dateFrom,
        to: dateTo
    }
}

export function getPredefinedRanges() {
    const startToday = moment().startOf('day').format()
    const endToday = moment().endOf('day').format()
    return [
        {
            key: 'today',
            titleKey: 'Today',
            range: [startToday, endToday],
        },
    ]
}

export function createDateHelper(timezone, locale, format='DD.MM HH:mm:ss') {
    return {
        formatDateRange: (from, to) => formatDateRange(from, to, timezone, locale),
        getDateBorders: (dates) => getDateBorders(dates, timezone, locale),
        formatDate: (date) => formatDate(date, timezone, locale, format)
    }
}
