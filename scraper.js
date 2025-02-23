const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({ headless: false }); // Set to false to debug
  const page = await browser.newPage();

  await page.goto("https://www.iplt20.com/stats/2024", {
    waitUntil: "networkidle2", // Wait until no network requests are happening
  });

  // Wait for the stats table to load
  await page.waitForSelector(".st-tableBg table.st-table", { timeout: 10000 }).catch(() => {
    console.log("Table not found! The page might not have loaded properly.");
  });

  // Extract data from the table
  const stats = await page.evaluate(() => {
    const rows = document.querySelectorAll("table.statsTable tbody tr");
    return Array.from(rows).map((row) => {
      const columns = row.querySelectorAll("td");
      return {
        pos: columns[0]?.innerText.trim(),
        player: columns[1]?.innerText.trim(),
        runs: columns[2]?.innerText.trim(),
        matches: columns[3]?.innerText.trim(),
        fours: columns[11] ? columns[11].innerText.trim() : "0",
        sixes: columns[12] ? columns[12].innerText.trim() : "0",

      };
    });
  });

  console.log(stats); // Debugging output

  // Save data to JSON file
  fs.writeFileSync("ipl_stats.json", JSON.stringify(stats, null, 2));

  await browser.close();
})();
