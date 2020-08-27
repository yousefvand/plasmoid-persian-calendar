// BUILD++: .pragma library
// BUILD++: .import "masks.js" as Masks
const Utils = require('./utils') // BUILD--
const Masks = require('./masks') // BUILD--

// Reinventing the wheel!
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

const tokens = [
  'pdddd', 'dddd',
  'ddd',
  'pdd', 'dd',
  'pd', 'd',
  'pmmmm', 'mmmm',
  'mmm',
  'pmm', 'mm',
  'pm', 'm',
  'pyyyy', 'yyyy',
  'pyy', 'yy',
  'phh', 'hh',
  'ph', 'h',
  'pHH', 'HH',
  'pH', 'H',
  'pMM', 'MM',
  'pM', 'M',
  'pss', 'ss',
  'ps', 's',
  'ptt', 'tt',
  'pt', 't',
  'pTT', 'TT',
  'pT', 'T'
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

const parse = (format, now) => {
  // each member of fnCache is an array of functions (order matters)
  const fnCache = {}
  return ((format, now) => {
    if (format in fnCache) {
      // Just apply functions from cache to new input
      return fnCache[format](now)
    } else {
      // TODO: const fns = tokenize(format).map(t => Masks.dict[t])
      fnCache[format] = Utils.chain(fns)
      return fnCache[format](now)
    }
  })(format, now)
}

module.exports = { tokenize, parse } // BUILD--
