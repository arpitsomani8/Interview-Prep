const fs = require('fs');
const pageContent = fs.readFileSync('src/pages/AllDefinitionsPage.jsx', 'utf8');

const matches = [];
let pos = 0;
while ((pos = pageContent.indexOf('langchain', pos)) !== -1) {
  matches.push(pos);
  pos += 9;
}
console.log('Matches for langchain in AllDefinitionsPage.jsx:', matches);
matches.forEach(m => {
  console.log('Around match:', pageContent.slice(Math.max(0, m - 50), Math.min(pageContent.length, m + 150)));
});
