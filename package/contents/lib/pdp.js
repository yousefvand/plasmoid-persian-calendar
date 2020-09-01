'use strict'

/*
    Bundled for QML from "Persian date parser v2.0.1"
    https://github.com/yousefvand/persian-date-parser
*/

const module = {}

const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']

const persianWeekDays = [
  'یکشنبه',
  'دوشنبه',
  'سه شنبه',
  'چهارشنبه',
  'پنج شنبه',
  'جمعه',
  'شنبه'
]

const persianWeekDaysAbbr = [
  'ی',
  'د',
  'س',
  'چ',
  'پ',
  'ج',
  'ش'
]

const WeekDaysFingilish = [
  'YekShanbe',
  'DoShanbe',
  'SeShanbe',
  'CharShanbe',
  'PanjShanbe',
  'Jome',
  'Shanbe'
]

const persianMonths = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند'
]

const persianMonthsFingilish = [
  'Farvardin',
  'Ordibehesht',
  'Khordad',
  'Tir',
  'Mordad',
  'Shahrivar',
  'Mehr',
  'Aban',
  'Azar',
  'Dey',
  'Bahman',
  'Esfand'
]

const persianMonthsAbbr = [
  'فرو',
  'ارد',
  'خرد',
  'تیر',
  'مرد',
  'شهر',
  'مهر',
  'آبا',
  'آذر',
  'دی',
  'بهم',
  'اسف'
]

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const monthsPingilish = [
  'ژانویه',
  'فوریه',
  'مارس',
  'آوریل',
  'می',
  'ژوئن',
  'جولای',
  'آگوست',
  'سپتامبر',
  'اکتبر',
  'نوامبر',
  'دسامبر'
]

const monthsPingilishAbbr = [
  'ژان',
  'فور',
  'مار',
  'آور',
  'می',
  'ژوئ',
  'جول',
  'آگو',
  'سپت',
  'اکت',
  'نوا',
  'دسا'
]

const weekDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

const weekDaysPingilish = [
  'ساندی',
  'ماندی',
  'تیوزدی',
  'ونزدی',
  'ترزدی',
  'فرایدی',
  'ساتردی'
]

const weekDaysPingilishAbbr = [
  'سان',
  'مان',
  'تیو',
  'ونز',
  'ترز',
  'فرا',
  'ستر'
]

var names = {
  persianDigits,
  persianWeekDays,
  persianWeekDaysAbbr,
  persianMonthsFingilish,
  monthsPingilish,
  persianMonths,
  monthsPingilishAbbr,
  persianMonthsAbbr,
  months,
  weekDays,
  weekDaysPingilish,
  weekDaysPingilishAbbr,
  WeekDaysFingilish
}

const constant = c => a => c
const digiPad = d => d < 10 ? `0${d}` : '' + d
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)
const chain = fns => now => fns.map(f => f(now)).join('')
const persianNumber = str => str.split('').map(persianDigit).join('')
const persianDigit = char => isNaN(char) ? char : names.persianDigits[parseInt(char)]
const objectShift = (obj, count = 1) => {
  for (const key in obj) {
    if (count <= 0) {
      break
    }
    delete obj[key]
    count--
  }
  return obj
}

var utils = {
  constant,
  digiPad,
  pipe,
  chain,
  persianNumber,
  persianDigit,
  objectShift
}

// Unfortunately KDE Javascript engine doesn't support 'toLocaleDateString' yet.

function gregorianToJalali (gy, gm, gd) {
  /**
    gregorianToJalali function License:
    Author: JDF.SCR.IR =>> Download Full Version :  http://jdf.scr.ir/jdf
    License: GNU/LGPL _ Open Source & Free :: Version: 2.80
  */
  let jy, jm, jd, days
  const gregorianDayMonth = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
  const gy2 = (gm > 2) ? (gy + 1) : gy
  days = 355666 + (365 * gy) + parseInt((gy2 + 3) / 4) - parseInt((gy2 + 99) / 100) +
    parseInt((gy2 + 399) / 400) + gd + gregorianDayMonth[gm - 1]
  jy = -1595 + (33 * parseInt(days / 12053))
  days %= 12053
  jy += 4 * parseInt(days / 1461)
  days %= 1461
  if (days > 365) {
    jy += parseInt((days - 1) / 365)
    days = (days - 1) % 365
  }
  if (days < 186) {
    jm = 1 + parseInt(days / 31)
    jd = 1 + (days % 31)
  } else {
    jm = 7 + parseInt((days - 186) / 30)
    jd = 1 + ((days - 186) % 30)
  }
  return { Year: jy, Month: jm, Day: jd }
}

const g2j = now => gregorianToJalali(now.getFullYear(now),
  now.getMonth(now) + 1, now.getDate(now))

const day = now => g2j(now).Day
const month = now => g2j(now).Month
const year = now => g2j(now).Year

var jcal = {
  day,
  month,
  year,
  gregorianToJalali
}

// d - Day of the month as digits. No leading zero for single-digit days.
const gd = now => '' + now.getDate(now)
const pgd = utils.pipe(gd, utils.persianNumber)
const jd = now => '' + jcal.day(now)
const pjd = utils.pipe(jd, utils.persianNumber)

// dd - Day of the month as digits. Leading zero for single-digit days.
const gdd = now => utils.digiPad(now.getDate(now))
const pgdd = utils.pipe(gdd, utils.persianNumber)
const jdd = now => utils.digiPad(jcal.day(now))
const pjdd = utils.pipe(jdd, utils.persianNumber)

// ddd - Day of the week as a three-letter abbreviation. Persian -> one-letter.
const gddd = now => names.weekDays[now.getDay()].substring(0, 3)
const pgddd = now => names.weekDaysPingilishAbbr[now.getDay()]
const jddd = now => names.WeekDaysFingilish[now.getDay()].substring(0, 3)
const pjddd = now => names.persianWeekDaysAbbr[now.getDay()]

// dddd - Day of the week as its full name.
const gdddd = now => names.weekDays[now.getDay()]
const pgdddd = now => names.weekDaysPingilish[now.getDay()]
const jdddd = now => names.WeekDaysFingilish[now.getDay()]
const pjdddd = now => names.persianWeekDays[now.getDay()]

// m - Month as digits. No leading zero for single-digit months.
const gm = now => '' + (now.getMonth(now) + 1)
const pgm = utils.pipe(gm, utils.persianNumber)
const jm = now => '' + jcal.month(now)
const pjm = utils.pipe(jm, utils.persianNumber)

// mm - Month as digits. Leading zero for single-digit months.
const gmm = now => utils.digiPad(now.getMonth(now) + 1)
const pgmm = utils.pipe(gmm, utils.persianNumber)
const jmm = now => utils.digiPad(jcal.month(now))
const pjmm = utils.pipe(jmm, utils.persianNumber)

// mmm - Month as a three-letter abbreviation.
const gmmm = now => names.months[now.getMonth(now)].substring(0, 3)
const pgmmm = now => names.monthsPingilishAbbr[now.getMonth(now)].substring(0, 3)
const jmmm = now => names.persianMonthsFingilish[jcal.month(now) - 1].substring(0, 3)
const pjmmm = now => names.persianMonthsAbbr[jcal.month(now) - 1]

// mmmm - Month as its full name.
const gmmmm = now => names.months[now.getMonth(now)]
const pgmmmm = now => names.monthsPingilish[now.getMonth(now)]
const jmmmm = now => names.persianMonthsFingilish[jcal.month(now) - 1]
const pjmmmm = now => names.persianMonths[jcal.month(now) - 1]

// yy - Year as last two digits. Leading zero for years less than 10.
const gyy = now => ('' + now.getFullYear(now)).substring(2)
const pgyy = utils.pipe(gyy, utils.persianNumber)
const jyy = now => ('' + jcal.year(now)).substring(2)
const pjyy = utils.pipe(jyy, utils.persianNumber)

// yyyy - Year represented by four digits.
const gyyyy = now => ('' + now.getFullYear(now))
const pgyyyy = utils.pipe(gyyyy, utils.persianNumber)
const jyyyy = now => ('' + jcal.year(now))
const pjyyyy = utils.pipe(jyyyy, utils.persianNumber)

// h - Hours. No leading zero for single-digit hours (12-hour clock).
const gh = now => '' + (now.getHours(now) % 12 || 12)
const pgh = utils.pipe(gh, utils.persianNumber)
const jh = gh
const pjh = pgh

// hh - Hours. Leading zero for single-digit hours (12-hour clock).
const ghh = now => utils.digiPad(now.getHours(now) % 12 || 12)
const pghh = utils.pipe(ghh, utils.persianNumber)
const jhh = ghh
const pjhh = pghh

// H - Hours. No leading zero for single-digit hours (24-hour clock).
const gH = now => '' + now.getHours(now)
const pgH = utils.pipe(gH, utils.persianNumber)
const jH = gH
const pjH = pgH

// HH - Hours. Leading zero for single-digit hours (24-hour clock).
const gHH = now => utils.digiPad(now.getHours(now))
const pgHH = utils.pipe(gHH, utils.persianNumber)
const jHH = gHH
const pjHH = pgHH

// M - Minutes. No leading zero for single-digit minutes.
const gM = now => '' + now.getMinutes(now)
const pgM = utils.pipe(gM, utils.persianNumber)
const jM = gM
const pjM = pgM

// MM - Minutes. Leading zero for single-digit minutes.
const gMM = now => utils.digiPad(now.getMinutes(now))
const pgMM = utils.pipe(gMM, utils.persianNumber)
const jMM = gMM
const pjMM = pgMM

// s - Seconds. No leading zero for single-digit seconds.
const gs = now => '' + now.getSeconds(now)
const pgs = utils.pipe(gs, utils.persianNumber)
const js = gs
const pjs = pgs

// ss - Seconds. Leading zero for single-digit seconds.
const gss = now => utils.digiPad(now.getSeconds(now))
const pgss = utils.pipe(gss, utils.persianNumber)
const jss = gss
const pjss = pgss

// t - Lowercase, single-character time marker string: a or p.
const gt = now => now.getHours(now) < 12 ? 'a' : 'p'
const pgt = now => now.getHours(now) < 12 ? 'ق' : 'ب'
const jt = gt
const pjt = pgt

// tt - Lowercase, two-character time marker string: am or pm.
const gtt = now => now.getHours(now) < 12 ? 'am' : 'pm'
const pgtt = now => now.getHours(now) < 12 ? 'ق.ظ' : 'ب.ظ'
const jtt = gtt
const pjtt = pgtt

// T - Uppercase, single-character time marker string: A or P.
const gT = now => now.getHours(now) < 12 ? 'A' : 'P'
const pgT = now => now.getHours(now) < 12 ? 'ق' : 'ب'
const jT = gT
const pjT = pgT

// TT - Uppercase, two-character time marker string: AM or PM.
const gTT = now => now.getHours(now) < 12 ? 'AM' : 'PM'
const pgTT = now => now.getHours(now) < 12 ? 'ق.ظ' : 'ب.ظ'
const jTT = gTT
const pjTT = pgTT

var masks = {
  gd,
  jd,
  pgd,
  pjd,
  //
  gdd,
  pgdd,
  jdd,
  pjdd,
  //
  gddd,
  pgddd,
  jddd,
  pjddd,
  //
  gdddd,
  pgdddd,
  jdddd,
  pjdddd,
  //
  gm,
  pgm,
  jm,
  pjm,
  //
  gmm,
  pgmm,
  jmm,
  pjmm,
  //
  gmmm,
  pgmmm,
  jmmm,
  pjmmm,
  //
  gmmmm,
  pgmmmm,
  jmmmm,
  pjmmmm,
  //
  gyy,
  pgyy,
  jyy,
  pjyy,
  //
  gyyyy,
  pgyyyy,
  jyyyy,
  pjyyyy,
  //
  gh,
  pgh,
  jh,
  pjh,
  //
  ghh,
  pghh,
  jhh,
  pjhh,
  //
  gH,
  pgH,
  jH,
  pjH,
  //
  gHH,
  pgHH,
  jHH,
  pjHH,
  //
  gM,
  pgM,
  jM,
  pjM,
  //
  gMM,
  pgMM,
  jMM,
  pjMM,
  //
  gs,
  pgs,
  js,
  pjs,
  //
  gss,
  pgss,
  jss,
  pjss,
  //
  gt,
  pgt,
  jt,
  pjt,
  //
  gtt,
  pgtt,
  jtt,
  pjtt,
  //
  gT,
  pgT,
  jT,
  pjT,
  //
  gTT,
  pgTT,
  jTT,
  pjTT
}

const utils$1 = utils

// descending in length. Shorter tokens are subsets of longer ones in each group.
const tokens = [
  'pgdddd', 'pjdddd', 'gdddd', 'jdddd',
  'pgddd', 'pjddd', 'gddd', 'jddd',
  'pgdd', 'pjdd', 'gdd', 'jdd',
  'pgd', 'pjd', 'gd', 'jd',
  //
  'pgmmmm', 'pjmmmm', 'gmmmm', 'jmmmm',
  'pgmmm', 'pjmmm', 'gmmm', 'jmmm',
  'pgmm', 'pjmm', 'gmm', 'jmm',
  'pgm', 'pjm', 'gm', 'jm',
  //
  'pgyyyy', 'pjyyyy', 'gyyyy', 'jyyyy',
  'pgyy', 'pjyy', 'gyy', 'jyy',
  //
  'pghh', 'pjhh', 'ghh', 'jhh',
  'pgh', 'pjh', 'gh', 'jh',
  //
  'pgHH', 'pjHH', 'gHH', 'jHH',
  'pgH', 'pjH', 'gH', 'jH',
  //
  'pgMM', 'pjMM', 'gMM', 'jMM',
  'pgM', 'pjM', 'gM', 'jM',
  //
  'pgss', 'pjss', 'gss', 'jss',
  'pgs', 'pjs', 'gs', 'js',
  //
  'pgtt', 'pjtt', 'gtt', 'jtt',
  'pgt', 'pjt', 'gt', 'jt',
  //
  'pgTT', 'pjTT', 'gTT', 'jTT',
  'pgT', 'pjT', 'gT', 'jT'
]

function tokenize (format, result = []) {
  if (format.length === 0) {
    return result
  }
  for (const token of tokens) {
    if (format.startsWith(token)) {
      result.push(token)
      return tokenize(format.substring(token.length), result)
    }
  }
  // not optimized for consecutive non-tokens in favor of common usage
  result.push(format[0])
  return tokenize(format.substring(1), result)
}

const parser = (cacheLimit = -1) => {
  if (cacheLimit < 0) {
    return (format, now) =>
      utils.chain(tokenize(format).map(t => masks[t] ? masks[t] : utils.constant(t)))(now)
  }
  let cacheSize = 0
  const fnCache = {} // each member of fnCache is an array of functions (order matters)
  cacheLimit = cacheLimit === 0 ? Number.POSITIVE_INFINITY : cacheLimit
  return (format, now) => {
    if (format in fnCache) {
      return fnCache[format](now)
    } else { // TODO: Smart cache invalidation
      if (cacheSize >= cacheLimit) {
        utils$1.objectShift(fnCache) // FIFO
      }
      const fns = tokenize(format).map(t => masks[t] ? masks[t] : utils.constant(t))
      fnCache[format] = utils.chain(fns)
      cacheSize++
      return fnCache[format](now)
    }
  }
}

const parse = parser(0xff) // Hardcoded cache size

module.exports = { parse }
