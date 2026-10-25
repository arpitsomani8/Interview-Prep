const fs = require('fs');
const pageFile = fs.readFileSync('src/pages/AllDefinitionsPage.jsx', 'utf8');

let pos = 0;
while (true) {
  const idx = pageFile.indexOf('big-data', pos);
  if (idx === -1) break;
  console.log('Found big-data in page at index', idx);
  console.log(pageFile.slice(Math.max(0, idx - 50), idx + 200));
  console.log('---');
  pos = idx + 8;
}
