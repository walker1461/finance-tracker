import http from "http";
import { initDB } from "./database.js";

const PORT = 5000;
let db;

(async () => {
  db = await initDB();

  const server = http.createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      res.writeHead(204);
      res.end();
      return;
    }

    if (req.url === "/transactions" && req.method === "GET") {
      const transactions = await db.all(
        "SELECT * FROM transactions ORDER BY date DESC"
      );
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(transactions));
    } else if (req.url === "/transactions" && req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", async () => {
        const { date, description, category, amount, type } = JSON.parse(body);
        await db.run(
          "INSERT INTO transactions (date, description, category, amount, type) VALUES (?, ?, ?, ?, ?)",
          [date, description, JSON.stringify(category), amount, type]
        );
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Transaction added" }));
      });
    } else {
      res.writeHead(404);
      res.end("Not Found");
    }
  });

  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();
