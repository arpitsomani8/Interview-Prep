const fs = require('fs');
const content = fs.readFileSync('src/pages/AllDefinitionsPage.jsx', 'utf8');
const idx = content.indexOf("item.id === 'langchain-langgraph'");
const nextIdx = content.indexOf("item.id === '", idx + 35);
console.log(content.slice(idx, nextIdx));
