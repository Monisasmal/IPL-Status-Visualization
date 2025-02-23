const express = require("express");
const fs = require("fs");
const cors = require("cors"); 
const path = require("path");

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.static("public"));

// Read scraped data
app.get("/ipl-stats", (req, res) => {
  const data = fs.readFileSync("ipl_stats.json", "utf8");
  res.json(JSON.parse(data));
});

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
