// BUILD++: .pragma library

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
  return { Year: jy, Month: jm, Day: jd }
}

const g2j = now => gregorianToJalali(now.getFullYear(now), now.getMonth(now) + 1, now.getDate(now))

const day = now => g2j(now).Day
const month = now => g2j(now).Month
const year = now => g2j(now).Year

module.exports = { day, month, year, gregorianToJalali } // BUILD--
