const generateYear = (argv, today) => {
  if (Object.prototype.hasOwnProperty.call(argv, 'y')) return argv.y
  else return today.getFullYear()
}
const generateMonth = (argv, today) => {
  if (Object.prototype.hasOwnProperty.call(argv, 'm')) return argv.m
  else return today.getMonth()
}
const generateLastday = (day, month) => {
  day.setMonth(month)
  day.setDate(0)
  return day.getDate()
}
const argv = require('minimist')(process.argv.slice(2))
const today = new Date()
const year = generateYear(argv, today)
const month = generateMonth(argv, today)
const firstday = new Date(parseInt(year), parseInt(month), 1)
const lastday = generateLastday(firstday, month)
const wday = firstday.getDay()
console.log(firstday)
process.stdout.write('      ' + (month + 1) + '月 ' + year + '\n')
process.stdout.write(' 日 月 火 水 木 金 土' + '\n')
for (let number = 0; number < (wday + 1) % 7; number++) {
  process.stdout.write('   ')
}
for (let days = 1; days <= lastday; days++) {
  if (days < 10) {
    process.stdout.write(' ')
  }
  process.stdout.write(String(days) + ' ')
  if ((days + wday) % 7 === 6) {
    process.stdout.write('\n')
  }
}
