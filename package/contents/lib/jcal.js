.pragma library

// Unfortunately KDE Javascript engine doesn't support "toLocaleDateString" yet.

const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
const weekDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]
const monthNames = [
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
const persianWeekDays = [
  'یکشنبه',
  'دوشنبه',
  'سه شنبه',
  'چهارشنبه',
  'پنج شنبه',
  'جمعه',
  'شنبه'
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

const persianNumber = str => str.split('').map(persianDigit).join('')
const persianDigit = char => isNaN(char) ? char : persianDigits[parseInt(char)]

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

function gregorianToJalali (gy, gm, gd) {
  /**
    gregorianToJalali function License:
    Author: JDF.SCR.IR =>> Download Full Version :  http://jdf.scr.ir/jdf
    License: GNU/LGPL _ Open Source & Free :: Version: 2.80
  */
  let jy, jm, jd, days
  const gregorianDayMonth = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
  const gy2 = (gm > 2) ? (gy + 1) : gy
  days = 355666 + (365 * gy) + parseInt((gy2 + 3) / 4) - parseInt((gy2 + 99) / 100) + parseInt((gy2 + 399) / 400) + gd + gregorianDayMonth[gm - 1]
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
  return { jy, jm, jd }
}
