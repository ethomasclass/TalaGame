// render-gif.js <in.html> <out.gif> [width] [height] [seconds] [fps]
// Steps the page's CSS/SVG animations deterministically, screenshots each frame,
// then hands the frames to tools/frames-to-gif.py (Pillow) for assembly.
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path'), os = require('os');
const { execFileSync } = require('child_process');

(async () => {
  const [src, out, wArg, hArg, secArg, fpsArg] = process.argv.slice(2);
  const w = Number(wArg || 1280), h = Number(hArg || 720);
  const seconds = Number(secArg || 3.2), fps = Number(fpsArg || 15);
  const n = Math.round(seconds * fps);
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'frames-'));

  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  await page.goto('file://' + path.resolve(src), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts && document.fonts.ready);
  await page.evaluate(() => document.getAnimations().forEach(a => a.pause()));
  for (let i = 0; i < n; i++) {
    const t = (i / fps) * 1000;
    await page.evaluate(t => document.getAnimations().forEach(a => { a.currentTime = t; }), t);
    await page.screenshot({ path: path.join(tmp, `f${String(i).padStart(4, '0')}.png`) });
  }
  await browser.close();
  execFileSync('python3', [path.join(__dirname, 'frames-to-gif.py'), tmp, out, String(fps)], { stdio: 'inherit' });
  fs.rmSync(tmp, { recursive: true, force: true });
})();
