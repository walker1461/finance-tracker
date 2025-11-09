import http from "http";
import {
  getAllTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
} from "./database.js";

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS, PUT"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.url === "/transactions" && req.method === "GET") {
    const transactions = getAllTransactions();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(transactions));
  } else if (req.url === "/transactions" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => (body += chunk.toString()));
    req.on("end", () => {
      try {
        const newTransaction = JSON.parse(body);
        const id = addTransaction(newTransaction);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ id, message: "Transaction added" }));
        console.log("received: ", newTransaction);
      } catch (err) {
        console.error("Error handling POST:", err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Failed to add transaction" }));
      }
    });
  } else if (req.url.startsWith("/transactions/") && req.method === "PUT") {
    const id = Number(req.url.split("/")[2]);
    let body = "";
    req.on("data", (chunk) => (body += chunk.toString()));
    req.on("end", () => {
      const updated = JSON.parse(body);
      const changes = updateTransaction(id, updated);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(changes));
    });
  } else if (req.url.startsWith("/transactions/") && req.method === "DELETE") {
    const id = Number(req.url.split("/")[2]);
    deleteTransaction(id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Transaction deleted" }));
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
