const fs = require('fs');
const content = fs.readFileSync('src/pages/AllDefinitionsPage.jsx', 'utf8');

// Find where the default/fallback render happens
// Search for `!item.` or default block
const idx = content.lastIndexOf('item.details');
console.log('Last item.details at:', idx);
console.log(content.slice(idx - 200, idx + 400));
