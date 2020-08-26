const masks = [
  {
    raw: new Date('2020-08-26T03:27:49.669'),
    d: '26',
    dd: '26',
    ddd: 'Wed',
    dddd: 'Wednesday',
    m: '8',
    mm: '08',
    mmm: 'Aug',
    mmmm: 'August',
    yy: '20',
    yyyy: '2020',
    h: '3',
    hh: '03',
    H: '3',
    HH: '03',
    M: '27',
    MM: '27',
    s: '49',
    ss: '49',
    t: 'a',
    tt: 'am',
    T: 'A',
    TT: 'AM'
  }
]

// Array of Gregorian dates and their respective Jalali equivalent.
const dates = [
  {
    gregorian: {
      Year: 1993,
      Month: 11,
      Day: 2
    },
    jalali: {
      Year: 1372,
      Month: 8,
      Day: 11
    }
  },
  {
    gregorian: {
      Year: 1944,
      Month: 6,
      Day: 6
    },
    jalali: {
      Year: 1323,
      Month: 3,
      Day: 16
    }
  },
  {
    gregorian: {
      Year: 1845,
      Month: 3,
      Day: 3
    },
    jalali: {
      Year: 1223,
      Month: 12,
      Day: 12
    }
  }
]

module.exports = {
  masks,
  dates
}
