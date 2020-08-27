/* eslint-env jest */

// const perf = require('perf_hooks')
// const data = require('./mock-data')
const utils = require('../package/contents/lib/utils')

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

describe('utils', () => {
  test('constant', () => {
    const rnd = Math.random()
    expect(utils.constant(rnd)(Math.random())).toBe(rnd)
  })
  // test('isMask', () => {
  //   'pdmyhHMstT'.split('').forEach(c => expect(utils.isMask(c)).toBe(true))
  //   'aBcDeFg_ijKLnOqRuVwXZ'.split('').forEach(c => expect(utils.isMask(c)).toBe(false))
  // })
  test('digiPad', () => {
    expect(utils.digiPad(5)).toBe('05')
    expect(utils.digiPad(9)).toBe('09')
    expect(utils.digiPad(15)).toBe('15')
    expect(utils.digiPad(23)).toBe('23')
  })
  test('chain', () => {
    const fns = [
      x => x + 1,
      x => x * 2,
      x => x / 3
    ]
    expect(utils.chain(fns)(3)).toBe('461')
  })
  test('persianNumber', () => {
    [
      { us: '012A34', fa: '۰۱۲A۳۴' },
      { us: '567z89', fa: '۵۶۷z۸۹' }
    ].forEach(s => expect(utils.persianNumber(s.us)).toBe(s.fa))
  })
  test('persianDigit', () => {
    [
      { us: '0', fa: '۰' },
      { us: '5', fa: '۵' },
      { us: 'T', fa: 'T' }
    ].forEach(n => expect(utils.persianNumber(n.us)).toBe(n.fa))
  })
  test('indexOfAny', () => {
    expect(utils.indexOfAny('abc', ['x,y,z'])).toBe(-1)
    expect(utils.indexOfAny('aHbc', ['o', 'H'])).toBe(1)
    expect(utils.indexOfAny('aHbMc', ['M', 'H'])).toBe(1)
    expect(utils.indexOfAny('yaHbc', ['m', 'H', 'y'])).toBe(0)
    expect(utils.indexOfAny('aZbQcs', ['p', 's', 'u'])).toBe(5)
  })
  test('memoize', () => {
    const f = x => Math.sqrt((19 * x ^ 2 + x * 3 - 7) / 5)
    const fm = utils.memoize(f)
    const inputs = [...new Array(0xff)].map(() => randInt(0x1, 0xffff))
    // const _ = inputs.map(fm) // memoize warm up
    // let t0 = perf.performance.now()
    const fo = inputs.map(f)
    // let t1 = perf.performance.now()
    // const tf = t1 - t0
    // t0 = perf.performance.now()
    const fmo = inputs.map(fm)
    // t1 = perf.performance.now()
    // const tfm = t1 - t0
    expect(fo).toEqual(fmo)
    // console.log(`tf: ${tf}, tfm: ${tfm}, tf > tfm: ${tf > tfm}`)
    // expect(tf).toBeGreaterThan(tfm)
  })
})
