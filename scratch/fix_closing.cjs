const fs = require('fs');
const file = 'src/pages/AllDefinitionsPage.jsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/\n\s*\)\r?\n\s*\{\/\* Item 39: Normalization \/ Scaling \*\//, '\n            )}\n\n            {/* Item 39: Normalization / Scaling */}');
fs.writeFileSync(file, content, 'utf8');
console.log('Fixed closing bracket!');
