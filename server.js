import express from "express";
import cors from "cors";
import {
  getAllTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
} from "./database.js";

const app = express();
app.use(cors());
app.use(express.json());

// GET
app.get("/transactions", (req, res) => {
  try {
    const transactions = getAllTransactions();
    res.json(transactions);
  } catch (err) {
    console.error("GET error:", err);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});

// POST
app.post("/transactions", (req, res) => {
  try {
    const { date, description, category, amount, type } = req.body;
    console.log("Adding transaction:", req.body);

    const id = addTransaction({
      date,
      description,
      category,
      amount,
      type,
    });

    res.status(201).json({ message: "Transaction added", id });
  } catch (err) {
    console.error("POST error:", err);
    res.status(500).json({ error: "Failed to add transaction" });
  }
});

// DELETE
app.delete("/transactions/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    console.log("Deleting transaction:", id);
    deleteTransaction(id);

    res.json({ message: "Transaction deleted" });
  } catch (err) {
    console.error("DELETE error:", err);
    res.status(500).json({ error: "Failed to delete transaction" });
  }
});

// PUT
app.put("/transactions/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    let body = "";
    const updated = JSON.parse(body);
    const changes = updateTransaction(id, updated);

    res.json({ message: "Transaction edited" });
  } catch (err) {
    console.error("PUT error:", err);
    res.status(500).json({ error: "Failed to edit transactions" });
  }
});
const PORT = 5000;
app.listen(PORT, () => console.log(`(express) server started on port ${PORT}`));
