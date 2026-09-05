// render-page.js <in.html|in.svg> <out.png> [width] [height] [scale]
// Renders a page at an exact viewport. For .svg the intrinsic size is read from the file.
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');

(async () => {
  const [src, out, wArg, hArg, sArg] = process.argv.slice(2);
  const scale = Number(sArg || 2);
  const isSvg = src.toLowerCase().endsWith('.svg');
  const body = fs.readFileSync(src, 'utf8');
  let w = Number(wArg), h = Number(hArg);
  if (isSvg && (!w || !h)) {
    w = Number(body.match(/\swidth="(\d+)"/)[1]);
    h = Number(body.match(/\sheight="(\d+)"/)[1]);
  }
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: scale });
  if (isSvg) {
    await page.setContent(`<style>html,body{margin:0;padding:0}svg{display:block}</style>${body}`, { waitUntil: 'load' });
  } else {
    await page.goto('file://' + path.resolve(src), { waitUntil: 'networkidle' });
  }
  await page.evaluate(() => document.fonts && document.fonts.ready);
  await page.waitForTimeout(400);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  await page.screenshot({ path: out, omitBackground: true });
  await browser.close();
  console.log(`${out} -> ${w * scale}x${h * scale}`);
})();
