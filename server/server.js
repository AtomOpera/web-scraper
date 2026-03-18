const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

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

app.get('/api/scrape', async (req, res) => {
  try {
    const { data } = await axios.get('https://example.com', {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
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

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});