const express = require('express');
const cors = require('cors');
const scrapeRoutes = require('./routes/scrape');

const app = express();
app.use(cors());
app.use('/api', scrapeRoutes);

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});