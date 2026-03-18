const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

app.get('/api/scrape', async (req, res) => {
  try {
    const { data } = await axios.get('https://example.com', {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const $ = cheerio.load(data);

    const title = $('title').text();

    res.json({ title });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Scraping failed' });
  }
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});