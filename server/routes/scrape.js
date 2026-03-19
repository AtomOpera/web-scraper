const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

// const app = express();
const router = express.Router();

const https = require('https');

const agent = new https.Agent({
  rejectUnauthorized: false,
});

// Recursive function to convert HTML element to JSON
function elementToJson(el, $) {
  const children = [];
  $(el)
    .children()
    .each((i, c) => children.push(elementToJson(c, $)));

  return {
    tag: el.tagName,
    text: $(el).text().trim(),
    attrs: el.attribs,
    children,
  };
}

// app.get('/api/scrape', async (req, res) => {
router.get('/scrape', async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: "URL is required" });
    //'https://example.com'
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      },
      httpsAgent: agent
    });

    const $ = cheerio.load(data);

    // Top-level HTML element
    const htmlElement = $('html')[0];

    const json = elementToJson(htmlElement, $);

    res.json(json);

    // const title = $('title').text();
    // res.json({ title });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Scraping failed' });
  }
});

// app.listen(3001, () => {
//   console.log('Server running on http://localhost:3001');
// });

module.exports = router;