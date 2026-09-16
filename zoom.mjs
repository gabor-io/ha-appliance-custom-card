import { chromium } from 'playwright';
const scenario = process.argv[2];
const out = process.argv[3];
const delay = Number(process.argv[4] || 900);
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const page = await browser.newPage({ viewport: { width: 900, height: 1400 }, deviceScaleFactor: 3 });
await page.goto('http://localhost:8099/demo/airfryer.html');
await page.waitForTimeout(500);
await page.evaluate((s) => {
  window.showOnly([s]);
  document.getElementById('toolbar').style.display = 'none';
  document.querySelectorAll('h3').forEach((h) => h.remove());
}, scenario);
await page.waitForTimeout(delay);
const card = await page.$('philips-airfryer-card');
const box = await card.evaluate((el) => {
  const r = el.shadowRoot.querySelector('.fryer').getBoundingClientRect();
  return { x: Math.max(0, r.x - 14), y: Math.max(0, r.y - 14), width: r.width + 28, height: r.height + 28 };
});
await page.screenshot({ path: out, clip: box });
await browser.close();
console.log('ok');
