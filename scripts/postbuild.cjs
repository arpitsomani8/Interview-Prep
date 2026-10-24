const fs = require('fs');
const path = require('path');

// 1. Read dist/index.html and strip the dev redirect script so production dist/docs runs directly
let distHtml = fs.readFileSync('dist/index.html', 'utf8');
distHtml = distHtml.replace(/<script>[\s\S]*?GitHub Pages SPA router[\s\S]*?<\/script>\s*/, '');
fs.writeFileSync('dist/index.html', distHtml);

// 2. Sync to docs/ (for GitHub Pages /docs folder deployments)
fs.rmSync('docs', { recursive: true, force: true });
fs.cpSync('dist', 'docs', { recursive: true });

// 3. Sync dist/assets to root ./assets (so assets exist in root as well)
fs.rmSync('assets', { recursive: true, force: true });
fs.cpSync('dist/assets', 'assets', { recursive: true });

// 4. Create canonical alias index.js and index.css for maximum resilience
const files = fs.readdirSync('dist/assets');
const jsFile = files.find(f => f.endsWith('.js'));
const cssFile = files.find(f => f.endsWith('.css'));
if (jsFile) {
  fs.copyFileSync(`dist/assets/${jsFile}`, 'assets/index.js');
  fs.copyFileSync(`dist/assets/${jsFile}`, 'docs/assets/index.js');
}
if (cssFile) {
  fs.copyFileSync(`dist/assets/${cssFile}`, 'assets/index.css');
  fs.copyFileSync(`dist/assets/${cssFile}`, 'docs/assets/index.css');
}

// 5. Create 404.html in root and docs for SPA fallback
fs.writeFileSync('404.html', distHtml);
fs.writeFileSync('docs/404.html', distHtml);

// 6. Ensure .nojekyll exists everywhere
fs.writeFileSync('.nojekyll', '');
fs.writeFileSync('docs/.nojekyll', '');

console.log('Post-build synchronization complete: docs/, assets/, 404.html, .nojekyll');
