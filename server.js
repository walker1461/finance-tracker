import http from "http";

let transactions = [];

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.url === "/transactions" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(transactions));
  } else if (req.url === "/transactions" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => (body += chunk.toString()));
    req.on("end", () => {
      const newTransaction = JSON.parse(body);
      transactions.push({ id: Date.now(), ...newTransaction });
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Transaction added" }));
    });
  } else if (req.url.startsWith("/transactions/") && req.method === "DELETE") {
    const id = Number(req.url.split("/")[2]);
    transactions = transactions.filter((t) => t.id !== id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Transaction deleted" }));
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
