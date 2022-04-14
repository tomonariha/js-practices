const generateYear = (argv, today) => {
  if (Object.prototype.hasOwnProperty.call(argv, 'y')) return argv.y
  else return today.getFullYear()
}
const generateMonth = (argv, today) => {
  if (Object.prototype.hasOwnProperty.call(argv, 'm')) return argv.m - 1
  else return today.getMonth()
}
const generateLastday = (day, month) => {
  day.setMonth(month + 1)
  day.setDate(0)
  return day.getDate()
}
const generateCalendar = (year, month, lastday, wday) => {
  process.stdout.write('      ' + (month + 1) + '月 ' + year + '\n')
  process.stdout.write(' 日 月 火 水 木 金 土' + '\n')
  for (let number = 1; number <= wday; number++) {
    process.stdout.write('   ')
  }
  for (let days = 1; days <= lastday; days++) {
    if (days < 10) {
      process.stdout.write(' ')
    }
    process.stdout.write(String(days) + ' ')
    if ((days + wday) % 7 === 0) {
      process.stdout.write('\n')
    }
  }
}
const argv = require('minimist')(process.argv.slice(2))
const today = new Date()
const year = generateYear(argv, today)
const month = generateMonth(argv, today)
const timeDifference = 9
const firstday = new Date(year, month, 1, timeDifference)
const wday = firstday.getDay()
const lastday = generateLastday(firstday, month)
generateCalendar(year, month, lastday, wday)
