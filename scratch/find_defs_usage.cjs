const fs = require('fs');
const content = fs.readFileSync('src/pages/AllDefinitionsPage.jsx', 'utf8');

const matches = [];
let pos = 0;
while ((pos = content.indexOf('definitionsData', pos)) !== -1) {
  matches.push(pos);
  pos += 15;
}
console.log('Matches:', matches);
matches.forEach(m => {
  console.log(content.slice(m - 30, m + 200));
});
