/* eslint-env jest */

const data = require('./mock-data')
const jcal = require('../package/contents/lib/jcal')

test('jcal', () => {
  for (const d of data.dates) {
    const j = jcal.gregorianToJalali(d.gregorian.Year, d.gregorian.Month, d.gregorian.Day)
    expect(j).toEqual(d.jalali)
    expect(jcal.year(d.raw)).toBe(d.jalali.Year)
    expect(jcal.month(d.raw)).toBe(d.jalali.Month)
    expect(jcal.day(d.raw)).toBe(d.jalali.Day)
  }
})
