/* eslint-env jest */

const data = require('./mock-data').formats
const parser = require('../package/contents/lib/parser')

describe('parser', () => {
  test('tokenize', () => {
    data.forEach(d => {
      expect(parser.tokenize(d.format)).toEqual(d.tokens)
    })
  })
  test('parse', () => {
    data.forEach(d => {
      expect(parser.parse(d.format, d.now)).toBe(d.display)
    })
  })
})
