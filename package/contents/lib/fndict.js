// BUILD++: .pragma library
// BUILD++: .import "names.js" as Names
// BUILD++: .import "utils.js" as Utils
const Names = require('./names') // BUILD--
const Utils = require('./utils') // BUILD--

/*
Parser masks. Prefix with 'p' for Persian digits/month names.

   Mask | Persian | Description
   ------------------------------------------------------------------------
   d    | pd      | Day of the month as digits. No leading zero for single-digit days.
   dd   | pdd     | Day of the month as digits. Leading zero for single-digit days.
   ddd  | N/A     | Day of the week as a three-letter abbreviation. Persian not supported.
   dddd | pdddd   | Day of the week as its full name.
   m    | pm      | Month as digits. No leading zero for single-digit months.
   mm   | pmm     | Month as digits. Leading zero for single-digit months.
   mmm  | N/A     | Month as a three-letter abbreviation. Persian not supported.
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

const fnDict = {
  d: now => now.getDate,
  dd: now => () => Utils.memoize(now => Utils.digiPad(now.getDate())),
  ddd: now => () => Utils.memoize(now => Names.weekDays[now.getDay()].substring(3)),
  dddd: now => () => Utils.memoize(now => Names.weekDays[now.getDay()]),
  m: now => now.getMonth() + 1,
  mm: now => () => Utils.memoize(now => Utils.digiPad(now.getMonth() + 1)),
  mmm: now => () => Utils.memoize(now => Names.months[now.getMonth()].substring(3)),
  mmmm: now => () => Utils.memoize(now => Names.months[now.getMonth()]),
  yy: now => Utils.memoize(now => ('' + now.fullYear()).substring(2)),
  yyyy: now => now.getFullYear,
  h: now => now.getHours
}

module.exports = { fnDict } // BUILD--
