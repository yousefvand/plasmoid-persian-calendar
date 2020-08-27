// BUILD++: .pragma library
// BUILD++: .import "names.js" as Names
const Names = require('./names') // BUILD--

// const id = a => a
const constant = c => a => c
const digiPad = d => d < 10 ? `0${d}` : '' + d
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)
const chain = fns => now => fns.map(f => f(now)).join('')
// const pad = (s, l = 2, p = '0') => new Array(l - ('' + s).length).fill(p).join('') + s

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
const persianNumber = str => str.split('').map(persianDigit).join('')
const persianDigit = char => isNaN(char) ? char : Names.persianDigits[parseInt(char)]
// const indexOfAny = (s, ts) => ts.map(t => s.indexOf(t)).filter(i => i > -1).sort().reverse().reduce((p, c) => c, -1)
const indexOfAny = (string, targets) => {
  const result = targets.map(t => string.indexOf(t)).filter(i => i > -1).sort()
  return result.length ? result[0] : -1
}

const memoize = fn => {
  const cache = {}
  return arg => {
    if (!(arg in cache)) {
      cache[arg] = fn(arg)
    }
    return cache[arg]
  }
}

module.exports = { constant, digiPad, pipe, chain, persianNumber, persianDigit, indexOfAny, memoize } // BUILD--

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
