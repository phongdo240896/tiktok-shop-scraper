const express = require('express');
const { chromium } = require('playwright');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/scrape', async (req, res) => {
  const categoryUrl = req.query.url;
  if (!categoryUrl) {
    return res.status(400).json({ error: 'Thiếu tham số ?url=' });
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(categoryUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(5000); // đợi load JS

  const data = await page.evaluate(() => {
    const products = [];
    const items = document.querySelectorAll('[data-sku-id]');
    items.forEach(item => {
      const name = item.querySelector('[data-e2e="product-title"]')?.innerText || '';
      const price = item.querySelector('[data-e2e="product-price"]')?.innerText || '';
      const sold = item.innerHTML.includes('Đã bán') ? item.innerHTML.match(/Đã bán ([\d,.Kk]+)/)?.[1] : '';
      const rating = item.innerHTML.match(/Rated ([\d.]+)/)?.[1] || '';
      const image = item.querySelector('img')?.src || '';
      const link = item.querySelector('a')?.href || '';
      products.push({ name, price, sold, rating, image, link });
    });
    return products;
  });

  await browser.close();
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
