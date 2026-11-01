const fs = require('fs');

const pageFile = 'src/pages/AllDefinitionsPage.jsx';
let content = fs.readFileSync(pageFile, 'utf8');

const transIdx = content.indexOf('{/* Item 33: Transformer */}');
if (transIdx === -1) throw new Error('Transformer not found');

// Find the last `</div>` before `transIdx`
const llmEndIdx = content.lastIndexOf('</div>', transIdx);
console.log('llmEndIdx:', llmEndIdx, 'transIdx:', transIdx);
console.log('Between llmEndIdx and transIdx:', JSON.stringify(content.slice(llmEndIdx, transIdx)));
