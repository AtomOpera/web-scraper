import { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleScrape = async () => {
    if (!url) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const response = await axios.get("http://localhost:3001/api/scrape", {
        params: { url },
      });
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Web Scraper</h1>
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "300px", marginRight: "10px" }}
      />
      <button onClick={handleScrape} disabled={loading}>
        {loading ? "Scraping..." : "Scrape"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <h4>for example https://example.com</h4>

      {result && (
        <div>
          <h2>Scraped Data</h2>
          <pre
            style={{
              marginTop: "20px",
              padding: "10px",
              backgroundColor: "#f0f0f0",
              maxHeight: "70vh",
              overflow: "auto",
              textAlign: "left",
            }}
          >
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;