const fs = require('fs');
const files = [
  'src/data/fashionData.js',
  'src/data/hybridData.js',
  'src/data/resumeData.js',
  'src/data/yoloData.js'
];
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const match = content.match(/executiveScript:\s*[`"']([^`"'\n]+)/);
  console.log(f, '->', match ? match[1].slice(0, 80) : 'not found');
});
