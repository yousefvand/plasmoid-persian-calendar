.pragma library

const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
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

function persianDate () {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const day = today.getDate()
  const jDate = gregorianToJalali(year, month, day)
  return persianNumber(jDate.jy + '/' + jDate.jm + '/' + jDate.jd)
}

function gregorianToJalali (gy, gm, gd) {
  /**
    gregorianToJalali function License:
    Author: JDF.SCR.IR =>> Download Full Version :  http://jdf.scr.ir/jdf
    License: GNU/LGPL _ Open Source & Free :: Version: 2.80
  */
  let jy, jm, jd, days
  let gregorianDayMonth = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
  let gy2 = (gm > 2) ? (gy + 1) : gy
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
