const fs = require('fs');
const content = fs.readFileSync('src/pages/AllDefinitionsPage.jsx', 'utf8');

const mapIdx = content.indexOf('definitionsData.map');
console.log('definitionsData.map at:', mapIdx);
if (mapIdx !== -1) {
  console.log(content.slice(mapIdx, mapIdx + 800));
}
