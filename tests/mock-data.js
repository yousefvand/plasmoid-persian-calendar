// const names = require('../package/contents/lib/names')

const formats = [
  {
    format: 'dd-MM',
    tokens: ['dd', '-', 'MM'],
    now: new Date('2015-09-02T07:03:08.006'),
    display: '02-09'
  }
]

const masks = [
  {
    raw: new Date('2020-08-26T03:27:49.669'),
    gd: '26',
    pgd: '۲۶',
    jd: '5',
    pjd: '۵',
    //
    gdd: '26',
    pgdd: '۲۶',
    jdd: '05',
    pjdd: '۰۵',
    //
    gddd: 'Wed',
    pgddd: 'ونز',
    jddd: 'Cha',
    pjddd: 'چ',
    //
    gdddd: 'Wednesday',
    pgdddd: 'ونزدی',
    jdddd: 'CharShanbe',
    pjdddd: 'چهارشنبه',
    m: '8',
    pm: '۸',
    mm: '08',
    pmm: '۰۸',
    mmm: 'Aug',
    pmmm: 'شهر',
    mmmm: 'August',
    pmmmm: 'شهریور',
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
  },
  {
    raw: new Date('2003-12-01T12:16:06.003'),
    gd: '1',
    pgd: '۱',
    jd: '10',
    pjd: '۱۰',
    //
    gdd: '01',
    pgdd: '۰۱',
    jdd: '10',
    pjdd: '۱۰',
    //
    gddd: 'Mon',
    pgddd: 'مان',
    jddd: 'DoS',
    pjddd: 'د',
    //
    gdddd: 'Monday',
    pgdddd: 'ماندی',
    jdddd: 'DoShanbe',
    pjdddd: 'دوشنبه',
    //
    m: '12',
    pm: '۱۲',
    mm: '12',
    pmm: '۱۲',
    mmm: 'Dec',
    pmmm: 'آذر',
    mmmm: 'December',
    pmmmm: 'آذر',
    yy: '03',
    yyyy: '2003',
    h: '12',
    hh: '12',
    H: '12',
    HH: '12',
    M: '16',
    MM: '16',
    s: '6',
    ss: '06',
    t: 'p',
    tt: 'pm',
    T: 'P',
    TT: 'PM'
  }
]

// Array of Gregorian dates and their respective Jalali equivalent.
const dates = [
  {
    raw: new Date('1993-11-02T16:13:59.200'),
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
    raw: new Date('1944-06-06T01:13:59.200'),
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
    raw: new Date('1845-03-03T01:13:59.200'),
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
  },
  {
    raw: new Date('2000-02-29T01:13:59.200'),
    gregorian: {
      Year: 2000,
      Month: 2,
      Day: 29
    },
    jalali: {
      Year: 1378,
      Month: 12,
      Day: 10
    }
  },
  {
    raw: new Date('2017-03-20T01:13:59.200'),
    gregorian: {
      Year: 2017,
      Month: 3,
      Day: 20
    },
    jalali: {
      Year: 1395,
      Month: 12,
      Day: 30
    }
  }
]

module.exports = {
  formats,
  masks,
  dates
}
