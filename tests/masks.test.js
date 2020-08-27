/* eslint-env jest */

const data = require('./mock-data').masks
const masks = require('../package/contents/lib/masks').dict

describe('masks', () => {
  // d
  test('gd', () => {
    // Day of the month as digits. No leading zero for single-digit days.
    data.forEach(d => {
      const mask = 'gd'
      expect(masks[mask](d.raw)).toBe(d.gd)
    })
  })
  test('pgd', () => {
    // Day of the month as digits. No leading zero for single-digit days.
    data.forEach(d => {
      const mask = 'pgd'
      expect(masks[mask](d.raw)).toBe(d.pgd)
    })
  })
  test('jd', () => {
    // Day of the month as digits. No leading zero for single-digit days.
    data.forEach(d => {
      const mask = 'jd'
      expect(masks[mask](d.raw)).toBe(d.jd)
    })
  })
  test('pjd', () => {
    // Day of the month as digits. No leading zero for single-digit days.
    data.forEach(d => {
      const mask = 'pjd'
      expect(masks[mask](d.raw)).toBe(d.pjd)
    })
  })
  // dd
  test('gdd', () => {
    // Day of the month as digits. Leading zero for single-digit days.
    data.forEach(d => {
      const mask = 'gdd'
      expect(masks[mask](d.raw)).toBe(d.gdd)
    })
  })
  test('pgdd', () => {
    // Day of the month as digits. Leading zero for single-digit days.
    data.forEach(d => {
      const mask = 'pgdd'
      expect(masks[mask](d.raw)).toBe(d.pgdd)
    })
  })
  test('jdd', () => {
    // Day of the month as digits. Leading zero for single-digit days.
    data.forEach(d => {
      const mask = 'jdd'
      expect(masks[mask](d.raw)).toBe(d.jdd)
    })
  })
  test('pjdd', () => {
    // Day of the month as digits. Leading zero for single-digit days.
    data.forEach(d => {
      const mask = 'pjdd'
      expect(masks[mask](d.raw)).toBe(d.pjdd)
    })
  })
  // ddd
  test('gddd', () => {
    // Day of the week as a three-letter abbreviation.
    data.forEach(d => {
      const mask = 'gddd'
      expect(masks[mask](d.raw)).toBe(d.gddd)
    })
  })
  test('pgddd', () => {
    // Day of the week as a one-letter abbreviation.
    data.forEach(d => {
      const mask = 'pgddd'
      expect(masks[mask](d.raw)).toBe(d.pgddd)
    })
  })
  test('jddd', () => {
    // Day of the week as a three-letter abbreviation.
    data.forEach(d => {
      const mask = 'jddd'
      expect(masks[mask](d.raw)).toBe(d.jddd)
    })
  })
  test('pjddd', () => {
    // Day of the week as a three-letter abbreviation.
    data.forEach(d => {
      const mask = 'pjddd'
      expect(masks[mask](d.raw)).toBe(d.pjddd)
    })
  })
  // dddd
  test('gdddd', () => {
    // Day of the week as its full name.
    data.forEach(d => {
      const mask = 'gdddd'
      expect(masks[mask](d.raw)).toBe(d.gdddd)
    })
  })
  test('pgdddd', () => {
    // Day of the week as its full name.
    data.forEach(d => {
      const mask = 'pgdddd'
      expect(masks[mask](d.raw)).toBe(d.pgdddd)
    })
  })
  test('jdddd', () => {
    // Day of the week as its full name.
    data.forEach(d => {
      const mask = 'jdddd'
      expect(masks[mask](d.raw)).toBe(d.jdddd)
    })
  })
  test('pjdddd', () => {
    // Day of the week as its full name.
    data.forEach(d => {
      const mask = 'pjdddd'
      expect(masks[mask](d.raw)).toBe(d.pjdddd)
    })
  })
  test('m', () => {
    // Month as digits. No leading zero for single-digit months.
    data.forEach(d => {
      const mask = 'm'
      expect(masks[mask](d.raw)).toBe(d.m)
    })
  })
  test('pm', () => {
    // Month as digits. No leading zero for single-digit months.
    data.forEach(d => {
      const mask = 'pm'
      expect(masks[mask](d.raw)).toBe(d.pm)
    })
  })
  test('mm', () => {
    // Month as digits. Leading zero for single-digit months.
    data.forEach(d => {
      const mask = 'mm'
      expect(masks[mask](d.raw)).toBe(d.mm)
    })
  })
  test('pmm', () => {
    // Month as digits. Leading zero for single-digit months.
    data.forEach(d => {
      const mask = 'pmm'
      expect(masks[mask](d.raw)).toBe(d.pmm)
    })
  })
  test('mmm', () => {
    // Month as a three-letter abbreviation.
    data.forEach(d => {
      const mask = 'mmm'
      expect(masks[mask](d.raw)).toBe(d.mmm)
    })
  })
  test('pmmm', () => {
    // Month as a three-letter abbreviation.
    data.forEach(d => {
      const mask = 'pmmm'
      expect(masks[mask](d.raw)).toBe(d.pmmm)
    })
  })
  test('pmmmm', () => {
    // Month as a three-letter abbreviation.
    data.forEach(d => {
      const mask = 'pmmmm'
      expect(masks[mask](d.raw)).toBe(d.pmmmm)
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
