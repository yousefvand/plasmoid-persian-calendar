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

const masks = {
  d: now => '' + now.getDate(now),
  dd: now => Utils.digiPad(now.getDate(now)),
  ddd: now => Names.weekDays[now.getDay()].substring(0, 3),
  dddd: now => Names.weekDays[now.getDay()],
  m: now => '' + (now.getMonth(now) + 1),
  mm: now => Utils.digiPad(now.getMonth(now) + 1),
  mmm: now => Names.months[now.getMonth(now)].substring(0, 3),
  mmmm: now => Names.months[now.getMonth(now)],
  yy: now => ('' + now.getFullYear(now)).substring(0, 2),
  yyyy: now => '' + now.getFullYear(now),
  h: now => '' + (now.getHours(now) % 12 || 12),
  hh: now => Utils.digiPad(now.getHours(now) % 12 || 12),
  H: now => '' + now.getHours(now),
  HH: now => Utils.digiPad(now.getHours(now)),
  M: now => '' + now.getMinutes(now),
  MM: now => Utils.digiPad(now.getMinutes(now)),
  s: now => '' + now.getSeconds(now),
  ss: now => Utils.digiPad(now.getSeconds(now)),
  t: now => now.getHours(now) < 12 ? 'a' : 'p',
  tt: now => now.getHours(now) < 12 ? 'am' : 'pm',
  T: now => now.getHours(now) < 12 ? 'A' : 'P',
  TT: now => now.getHours(now) < 12 ? 'AM' : 'PM'
}

module.exports = { masks } // BUILD--
