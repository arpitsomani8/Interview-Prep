const fs = require('fs');
const content = fs.readFileSync('src/pages/AllDefinitionsPage.jsx', 'utf8');

const idx = content.indexOf("item.id === 'llm'");
console.log('llm idx:', idx);
const nextIdx = content.indexOf("item.id === 'transformer'", idx);
console.log('transformer idx:', nextIdx);
console.log(content.slice(nextIdx - 500, nextIdx + 50));
