const fs = require('fs');
const pageFile = fs.readFileSync('src/pages/AllDefinitionsPage.jsx', 'utf8');

const start = pageFile.indexOf("{item.id === 'big-data' && (");
const end = pageFile.indexOf("{item.id === '", start + 30);
console.log(pageFile.slice(start, start + 3000));
console.log('\n--- NEXT CHUNK ---\n');
console.log(pageFile.slice(start + 3000, end));
