// BUILD++: .pragma library
// BUILD++: .import "jcal.js" as JCal
// BUILD++: .import "names.js" as Names
// BUILD++: .import "utils.js" as Utils
const JCal = require('./jcal') // BUILD--
const Names = require('./names') // BUILD--
const Utils = require('./utils') // BUILD--

/*
Parser masks. Prefix with 'p' for Persian digits/month names.

   Mask | Persian | Description
   ------------------------------------------------------------------------
   d    | pd      | Day of the month as digits. No leading zero for single-digit days.
   dd   | pdd     | Day of the month as digits. Leading zero for single-digit days.
   ddd  | pddd    | Day of the week as a three-letter abbreviation. Persian -> one-letter.
   dddd | pdddd   | Day of the week as its full name.
   m    | pm      | Month as digits. No leading zero for single-digit months.
   mm   | pmm     | Month as digits. Leading zero for single-digit months.
   mmm  | pmmm    | Month as a three-letter abbreviation.
   mmmm | pmmmm   | Month as its full name.
   yy   | pyy     | Year as last two digits. Leading zero for years less than 10.
   yyyy | pyyyy   | Year represented by four digits.
   h    | ph      | Hours. No leading zero for single-digit hours (12-hour clock).
   hh   | phh     | Hours. Leading zero for single-digit hours (12-hour clock).
   H    | pH      | Hours. No leading zero for single-digit hours (24-hour clock).
   HH   | pHH     | Hours. Leading zero for single-digit hours (24-hour clock).
   M    | pM      | Minutes. No leading zero for single-digit minutes.
   MM   | pMM     | Minutes. Leading zero for single-digit minutes.
   s    | ps      | Seconds. No leading zero for single-digit seconds.
   ss   | pss     | Seconds. Leading zero for single-digit seconds.
   t    | pt      | Lowercase, single-character time marker string: a or p.
   tt   | ptt     | Lowercase, two-character time marker string: am or pm.
   T    | pT      | Uppercase, single-character time marker string: A or P.
   TT   | pTT     | Uppercase, two-character time marker string: AM or PM.

*/

// d - Day of the month as digits. No leading zero for single-digit days.
const gd = now => '' + now.getDate(now)
const pgd = Utils.pipe(gd, Utils.persianNumber)
const jd = now => '' + JCal.day(now)
const pjd = Utils.pipe(jd, Utils.persianNumber)

// dd - Day of the month as digits. Leading zero for single-digit days.
const gdd = now => Utils.digiPad(now.getDate(now))
const pgdd = Utils.pipe(gdd, Utils.persianNumber)
const jdd = now => Utils.digiPad(JCal.day(now))
const pjdd = Utils.pipe(jdd, Utils.persianNumber)

// ddd - Day of the week as a three-letter abbreviation. Persian -> one-letter.
const gddd = now => Names.weekDays[now.getDay()].substring(0, 3)
const pgddd = now => Names.weekDaysPingilishAbbr[now.getDay()]
const jddd = now => Names.WeekDaysFingilish[now.getDay()].substring(0, 3)
const pjddd = now => Names.persianWeekDaysAbbr[now.getDay()]

// dddd - Day of the week as its full name.
const gdddd = now => Names.weekDays[now.getDay()]
const pgdddd = now => Names.weekDaysPingilish[now.getDay()]
const jdddd = now => Names.WeekDaysFingilish[now.getDay()]
const pjdddd = now => Names.persianWeekDays[now.getDay()]

// Month as digits. No leading zero for single-digit months.
// TODO: Here
const m = now => '' + (now.getMonth(now) + 1)
const pm = Utils.pipe(m, Utils.persianNumber)

const mm = now => Utils.digiPad(now.getMonth(now) + 1)
const pmm = Utils.pipe(mm, Utils.persianNumber)

const mmm = now => Names.months[now.getMonth(now)].substring(0, 3)
const pmmm = now => Names.persianMonthsAbbr[JCal.month(now) - 1]

const mmmm = now => Names.months[now.getMonth(now)]
const pmmmm = now => Names.persianMonths[JCal.gregorianToJalali(now.getFullYear(now), now.getMonth(now), now.getDate(now)).Month]

const yy = now => ('' + now.getFullYear(now)).substring(2)
const pyy = now => JCal.year(now)

const yyyy = now => '' + now.getFullYear(now)

const h = now => '' + (now.getHours(now) % 12 || 12)

const hh = now => Utils.digiPad(now.getHours(now) % 12 || 12)

const H = now => '' + now.getHours(now)

const HH = now => Utils.digiPad(now.getHours(now))

const M = now => '' + now.getMinutes(now)

const MM = now => Utils.digiPad(now.getMinutes(now))

const s = now => '' + now.getSeconds(now)

const ss = now => Utils.digiPad(now.getSeconds(now))

const t = now => now.getHours(now) < 12 ? 'a' : 'p'

const tt = now => now.getHours(now) < 12 ? 'am' : 'pm'

const T = now => now.getHours(now) < 12 ? 'A' : 'P'

const TT = now => now.getHours(now) < 12 ? 'AM' : 'PM'

const dict = {
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
  m,
  pm,
  mm,
  pmm,
  mmm,
  pmmm,
  mmmm,
  pmmmm,
  yy,
  pyy,
  yyyy,
  h,
  hh,
  H,
  HH,
  M,
  MM,
  s,
  ss,
  t,
  tt,
  T,
  TT
}

module.exports = { dict } // BUILD--
