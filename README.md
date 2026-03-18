# Web Scraper Project

This is a simple fullstack web scraping project using **Node.js + Express** for the backend and a frontend framework (Vue, React, or plain HTML) for the client.

---

## 📁 Project Structure

web-scraper/
│
├── server/ # Node/Express backend
│ ├── server.js # Main server setup
│ └── routes/ # API routes/endpoints
│ └── scrape.js # Example scraping endpoint
│
├── client/ # Frontend application
│ ├── src/ # Frontend source code
│ └── index.html # Entry HTML file
│
├── package.json # Project dependencies & scripts
└── README.md # This file

---

## 🧠 Notes

### 1. Backend (`server/`)
- Contains all the Node.js code.
- `server.js` sets up the Express app, middleware, and port.
- `routes/` holds separate files for API endpoints.
  - Example: `routes/scrape.js` defines `/api/scrape`.
- Benefits:
  - Keeps code organized.
  - Makes it easy to scale with multiple endpoints.
  - Separates “URL definition” (routes) from “business logic” (controllers/services).

---

### 2. Frontend (`client/`)
- Can be Vue, React, or plain HTML/JS.
- Calls the backend API for scraped data.
- Example fetch:

```js
fetch('http://localhost:3001/api/scrape')
  .then(res => res.json())
  .then(data => console.log(data));
```

## 💡 How to Run

1. Install dependencies:
```bash 
npm install
```


2. Start the backend server
```bash 
node server/server.js
```