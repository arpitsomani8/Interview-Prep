const fs = require('fs');
const content = fs.readFileSync('src/data/allDefinitionsData.js', 'utf8');
const defsMatch = content.match(/export const definitionsData = (\[[\s\S]*?\]);\s*$/);
const defs = JSON.parse(defsMatch[1]);

const llm = defs.find(d => d.id === 'llm');
console.log('llm keys:', Object.keys(llm));
console.log('llm has kvCacheAndPagedAttention:', !!llm.kvCacheAndPagedAttention);
console.log('llm has inferenceMicroservice:', !!llm.inferenceMicroservice);

const judge = defs.find(d => d.id === 'llm-as-a-judge');
console.log('judge found:', !!judge, judge ? Object.keys(judge) : null);

const lc = defs.find(d => d.id === 'langchain-langgraph');
console.log('langchain found:', !!lc, lc ? Object.keys(lc) : null);
