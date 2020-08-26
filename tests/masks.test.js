/* eslint-env jest */

const data = require('./mock-data').masks
const masks = require('../package/contents/lib/masks').masks

describe('masks', () => {
  test('d', () => {
    // Day of the month as digits. No leading zero for single-digit days.
    data.forEach(d => {
      const mask = 'd'
      expect(masks[mask](d.raw)).toBe(d.d)
    })
  })
  test('dd', () => {
    // Day of the month as digits. Leading zero for single-digit days.
    data.forEach(d => {
      const mask = 'dd'
      expect(masks[mask](d.raw)).toBe(d.dd)
    })
  })
  test('ddd', () => {
    // Day of the week as a three-letter abbreviation. Persian not supported.
    data.forEach(d => {
      const mask = 'ddd'
      expect(masks[mask](d.raw)).toBe(d.ddd)
    })
  })
  test('dddd', () => {
    // Day of the week as its full name.
    data.forEach(d => {
      const mask = 'dddd'
      expect(masks[mask](d.raw)).toBe(d.dddd)
    })
  })
  test('m', () => {
    // Month as digits. No leading zero for single-digit months.
    data.forEach(d => {
      const mask = 'm'
      expect(masks[mask](d.raw)).toBe(d.m)
    })
  })
  test('mm', () => {
    // Month as digits. Leading zero for single-digit months.
    data.forEach(d => {
      const mask = 'mm'
      expect(masks[mask](d.raw)).toBe(d.mm)
    })
  })
  test('mmm', () => {
    // Month as a three-letter abbreviation. Persian not supported.
    data.forEach(d => {
      const mask = 'mmm'
      expect(masks[mask](d.raw)).toBe(d.mmm)
    })
  })
  test('mmmm', () => {
    // Month as its full name.
    data.forEach(d => {
      const mask = 'mmmm'
      expect(masks[mask](d.raw)).toBe(d.mmmm)
    })
  })
  test('yy', () => {
    // Year as last two digits. Leading zero for years less than 10.
    data.forEach(d => {
      const mask = 'yy'
      expect(masks[mask](d.raw)).toBe(d.yy)
    })
  })
  test('yyyy', () => {
    // Year as last two digits. Leading zero for years less than 10.
    data.forEach(d => {
      const mask = 'yyyy'
      expect(masks[mask](d.raw)).toBe(d.yyyy)
    })
  })
  test('h', () => {
    // Hours. No leading zero for single-digit hours (12-hour clock).
    data.forEach(d => {
      const mask = 'h'
      expect(masks[mask](d.raw)).toBe(d.h)
    })
  })
  test('hh', () => {
    // Hours. Leading zero for single-digit hours (12-hour clock).
    data.forEach(d => {
      const mask = 'hh'
      expect(masks[mask](d.raw)).toBe(d.hh)
    })
  })
  test('H', () => {
    // Hours. No leading zero for single-digit hours (24-hour clock).
    data.forEach(d => {
      const mask = 'H'
      expect(masks[mask](d.raw)).toBe(d.H)
    })
  })
  test('HH', () => {
    // Hours. Leading zero for single-digit hours (24-hour clock).
    data.forEach(d => {
      const mask = 'HH'
      expect(masks[mask](d.raw)).toBe(d.HH)
    })
  })

  test('M', () => {
    // Minutes. No leading zero for single-digit minutes.
    data.forEach(d => {
      const mask = 'M'
      expect(masks[mask](d.raw)).toBe(d.M)
    })
  })
  test('MM', () => {
    // Minutes. Leading zero for single-digit minutes.
    data.forEach(d => {
      const mask = 'MM'
      expect(masks[mask](d.raw)).toBe(d.MM)
    })
  })
  test('s', () => {
    // Seconds. No leading zero for single-digit seconds.
    data.forEach(d => {
      const mask = 's'
      expect(masks[mask](d.raw)).toBe(d.s)
    })
  })
  test('ss', () => {
    // Seconds. Leading zero for single-digit seconds.
    data.forEach(d => {
      const mask = 'ss'
      expect(masks[mask](d.raw)).toBe(d.ss)
    })
  })
  test('t', () => {
    // Lowercase, single-character time marker string: a or p.
    data.forEach(d => {
      const mask = 't'
      expect(masks[mask](d.raw)).toBe(d.t)
    })
  })
  test('tt', () => {
    // Lowercase, two-character time marker string: am or pm.
    data.forEach(d => {
      const mask = 'tt'
      expect(masks[mask](d.raw)).toBe(d.tt)
    })
  })
  test('T', () => {
    // Uppercase, single-character time marker string: A or P.
    data.forEach(d => {
      const mask = 'T'
      expect(masks[mask](d.raw)).toBe(d.T)
    })
  })
  test('TT', () => {
    // Uppercase, two-character time marker string: AM or PM.
    data.forEach(d => {
      const mask = 'TT'
      expect(masks[mask](d.raw)).toBe(d.TT)
    })
  })
})
