const fs = require('fs');

const dataContent = fs.readFileSync('src/data/allDefinitionsData.js', 'utf8');
const defsMatch = dataContent.match(/export const definitionsData = (\[[\s\S]*?\]);\s*$/);
const defs = JSON.parse(defsMatch[1]);
const item = defs.find(d => d.id === 'langchain-langgraph');
console.log('Item found:', !!item);
if (item) {
  console.log('Keys:', Object.keys(item));
  console.log('Title:', item.title);
  console.log('Item stringified length:', JSON.stringify(item).length);
}

const pageContent = fs.readFileSync('src/pages/AllDefinitionsPage.jsx', 'utf8');
const idx = pageContent.indexOf("item.id === 'langchain-langgraph'");
console.log('Page JSX idx:', idx);
if (idx !== -1) {
  console.log('JSX snippet:', pageContent.slice(idx, idx + 1000));
}
