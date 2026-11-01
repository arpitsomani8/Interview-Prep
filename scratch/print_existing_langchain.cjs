const fs = require('fs');
const content = fs.readFileSync('src/data/allDefinitionsData.js', 'utf8');
const defsMatch = content.match(/export const definitionsData = (\[[\s\S]*?\]);\s*$/);
const defs = JSON.parse(defsMatch[1]);
const item = defs.find(d => d.id === 'langchain-langgraph');
console.log(JSON.stringify(item, null, 2));
