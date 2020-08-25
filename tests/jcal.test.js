/* eslint-env jest */

const data = require('./mock-data')
const jcal = require('../package/contents/lib/jcal')

test('jcal', () => {
  // console.log(`Validating ${data.dates.length} date examples...`)
  for (const d of data.dates) {
    const j = jcal.gregorianToJalali(d.gregorian.Year, d.gregorian.Month, d.gregorian.Day)
    expect(j).toEqual(d.jalali)
  }
})
