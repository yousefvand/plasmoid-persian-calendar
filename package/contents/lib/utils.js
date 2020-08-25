// BUILD++: .pragma library
// BUILD++: .import "names.js" as names
const names = require('./names') // BUILD-

// const id = a => a
const constant = c => a => c
const isMask = c => 'pdmyhHMstT'.includes(c)
const digiPad = d => d < 10 ? `0${d}` : '' + d
// const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)
const chain = fns => now => fns.map(f => f(now)).join('')
// const pad = (s, l = 2, p = '0') => new Array(l - ('' + s).length).fill(p).join('') + s

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
const persianNumber = str => str.split('').map(persianDigit).join('')
const persianDigit = char => isNaN(char) ? char : names.persianDigits[parseInt(char)]

const memoize = fn => {
  const cache = {}
  return arg => {
    if (!(arg in cache)) {
      cache[arg] = fn(arg)
    }
    return cache[arg]
  }
}

const fnDict = {
  d: now => now.getDate,
  dd: now => () => memoize(now => digiPad(now.getDate())),
  ddd: now => () => memoize(now => names.weekDays[now.getDay()].substring(3)),
  dddd: now => () => memoize(now => names.weekDays[now.getDay()]),
  m: now => now.getMonth() + 1,
  mm: now => () => memoize(now => digiPad(now.getMonth() + 1)),
  mmm: now => () => memoize(now => names.months[now.getMonth()].substring(3)),
  mmmm: now => () => memoize(now => names.months[now.getMonth()]),
  yy: now => memoize(now => ('' + now.fullYear()).substring(2)),
  yyyy: now => now.getFullYear,
  h: now => now.getHours
}

module.exports = { constant, isMask, digiPad, chain, persianNumber, persianDigit, memoize, fnDict } // BUILD--

/*
// Old stuff

function fullDateTime (timeZone = 'local') {
  // TODO: Support different timezones manually including daylight savings
  // Not supported by KDE JS engine:
  // const zoneTime = new Date().toLocaleString('en-US', {timeZone: timeZone})
  const now = new Date()
  return now.getHours()
}

function persianDateShort () {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const day = today.getDate()
  const jDate = gregorianToJalali(year, month, day)
  return persianNumber(jDate.jy + '/' + jDate.jm + '/' + jDate.jd)
}

function persianDateLong () {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const day = today.getDate()
  const jDate = gregorianToJalali(year, month, day)
  const jWeekDay = persianWeekDays[today.getDay()]
  const jDay = persianNumber('' + jDate.jd)
  const jMonthName = persianMonths[jDate.jm - 1]
  const jYear = persianNumber('' + jDate.jy)
  return `${jWeekDay}، ${jDay} ${jMonthName} ${jYear}`
}

function gregorianDateLong () {
  const today = new Date()
  const weekDay = weekDays[today.getDay()]
  const day = today.getDate()
  const monthName = monthNames[today.getMonth()]
  const year = today.getFullYear()
  return `${weekDay}, ${day} ${monthName} ${year}`
}

*/
