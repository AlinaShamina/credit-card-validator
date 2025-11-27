const puppeteer = require('puppeteer');
const startServer = require('../../e2e.server.helper');

let browser;
let page;
let server;

jest.setTimeout(120000); 
beforeAll(async () => {
  server = await startServer();

  browser = await puppeteer.launch({ headless: true });
  page = await browser.newPage();
});

afterAll(async () => {
  console.log('Closing browser...');
  if (browser) {
    try {
      await browser.close();
      console.log('Browser closed.');
    } catch (err) {
      console.error('Failed to close browser:', err);
    }
  }

  console.log('Stopping server...');
  if (server) {
    try {
      await server.stop();
      console.log('Server stopped.');
    } catch (err) {
      console.error('Failed to stop server:', err);
    }
  }

  console.log('Teardown complete.');
}, 180000);

describe('Credit Card Validator Widget (e2e)', () => {
  test('Widget loads', async () => {
    await page.goto('http://localhost:9000', { waitUntil: 'networkidle0' });
    await page.waitForSelector('.card-input');

    const widgetExists = (await page.$('.card-input')) !== null;
    expect(widgetExists).toBe(true);
  });

  test('Widget validates Visa card correctly', async () => {
    await page.goto('http://localhost:9000', { waitUntil: 'networkidle0' });
    await page.waitForSelector('.card-input');

    await page.click('.card-input', { clickCount: 3 });
    await page.type('.card-input', '4111111111111111');
    await page.click('.validate-btn');

    await page.waitForSelector('.result');
    const resultText = await page.$eval('.result', el => el.textContent);
    expect(resultText.toLowerCase()).toContain('валидна');
  });

  test('Widget shows invalid message for wrong card', async () => {
    await page.goto('http://localhost:9000', { waitUntil: 'networkidle0' });
    await page.waitForSelector('.card-input');

    await page.click('.card-input', { clickCount: 3 });
    await page.type('.card-input', '1234567890123456');
    await page.click('.validate-btn');

    await page.waitForSelector('.result');
    const resultText = await page.$eval('.result', el => el.textContent);
    expect(resultText.toLowerCase()).toContain('не валидна');
  });
});
