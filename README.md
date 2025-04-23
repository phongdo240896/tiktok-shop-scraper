# TikTok Shop Category Scraper

This is a simple Node.js API built with Playwright to scrape product data from TikTok Shop category pages.

## How to Use

1. Install dependencies:
```
npm install
```

2. Start server:
```
node server.js
```

3. Call the API:
```
GET /scrape?url=https://shop.tiktok.com/category?cat=healthcare
```

## Output

JSON array of products:
```json
[
  {
    "name": "Tên sản phẩm",
    "price": "239000",
    "sold": "1.2K",
    "rating": "4.9",
    "image": "https://link.to/image.jpg",
    "link": "https://shop.tiktok.com/product/xyz"
  }
]
```

## Notes

- You must deploy on a server that supports Playwright (e.g., Render.com).
- TikTok Shop may update layout frequently. Adjust selectors if scraping fails.
