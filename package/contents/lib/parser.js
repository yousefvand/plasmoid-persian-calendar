// BUILD++: .pragma library
// BUILD++: .import "utils.js" as Utils
const Utils = require('./utils') // BUILD--

// Reinventing the wheel!
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

const parse = (format, now) => {
  const fnCache = {} // each member of fnCache is an array of functions (order matters)
  return ((format, now) => {
    if (format in fnCache) {
      return fnCache[format](now) // Just apply functions from cache to new input
    } else {
      const fns = []
      let mask = ''
      let rest = ''
      for (let i = 0; i < format.length; i++) {
        const char = format[i]
        if (Utils.isMask(char)) {
          if (rest.length > 0) {
            fns.push(Utils.constant(rest))
            rest = ''
          }
          mask += char
        } else {
          if (mask.length > 0) {
            if (mask in Utils.masks) {
              fns.push(Utils.masks[mask])
            } else {
              fns.push(Utils.constant(mask))
            }
            mask = ''
          }
          rest += char
        }
      }
      fnCache[format] = Utils.chain(fns)
      // residue?
      console.log(`mask: ${mask}\nrest: ${rest}`)
    }
  })()
}

module.exports = { parse } // BUILD--
