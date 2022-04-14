const argv = require('minimist')(process.argv.slice(2));
const today = new Date()
if (argv.hasOwnProperty('y'))
  year = argv.y;
else
  year = today.getFullYear();

if (argv.hasOwnProperty('m'))
  month = argv.m;
else 
  month = today.getMonth() + 1;

const day = new Date(parseInt(year), parseInt(month));
day.setDate(1)
const wday = day.getDay();
day.setMonth(month);
day.setDate(0);
const last_day = day.getDate();
process.stdout.write('      ' + month + '月 ' + year + '\n')
process.stdout.write(' 日 月 火 水 木 金 土' + '\n')
for (let number = 0; number <= wday; number++) {
  process.stdout.write('   ')
}
for (let days = 1; days <= last_day; days++ ) {
  if (days < 10) {
    process.stdout.write(' ')
  }
  process.stdout.write( String(days) + ' ');
  if ((days + wday) % 7 == 6) {
    process.stdout.write('\n')
  }
}
