// render.js <in.svg> <out.png> [scale]  — exact-viewport SVG rasteriser
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');

(async () => {
  const [svgPath, outPath, scaleArg] = process.argv.slice(2);
  const scale = Number(scaleArg || 2);
  const svg = fs.readFileSync(svgPath, 'utf8');
  const w = Number(svg.match(/\swidth="(\d+)"/)[1]);
  const h = Number(svg.match(/\sheight="(\d+)"/)[1]);

  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const page = await browser.newPage({
    viewport: { width: w, height: h },
    deviceScaleFactor: scale,
  });
  await page.setContent(
    `<style>html,body{margin:0;padding:0;background:transparent}svg{display:block}</style>${svg}`,
    { waitUntil: 'load' }
  );
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  await page.screenshot({ path: outPath, omitBackground: true });
  await browser.close();
  console.log(`${outPath} -> ${w * scale}x${h * scale}`);
})();
