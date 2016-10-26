const moment = require('moment');
const fs = require('fs');

const cutStrikes = (chopDate, items) => items.filter(({ date }) => moment(date).isAfter(chopDate));

try {
  const filePath = './src/assets/strikes.json';
  const strikes = JSON.parse(fs.readFileSync(filePath));
  const finalStrikes = cutStrikes(moment('03-23-2015', 'MM-DD-YYYY'), strikes.strike);
  console.log(`final strikes: ${finalStrikes.length}`);
  fs.writeFileSync(`${filePath}.new`, JSON.stringify(finalStrikes));
} catch (e) {
  console.error(e);
  process.exit(-1);
}
