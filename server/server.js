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
  const transactions = getAllTransactions();
  res.json(transactions);
});

// POST
app.post("/transactions", (req, res) => {
  const newTransaction = addTransaction(req.body);
  res.json(newTransaction);
});

// DELETE
app.delete("/transactions/:id", (req, res) => {
  const { id } = req.params;
  const deleted = deleteTransaction(id);
  res.json(deleted);
});

// PUT
app.put("/transactions/:id", (req, res) => {
  const { id } = req.params;
  const updated = updateTransaction(id, req.body);
  res.json(updated);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`(express) server started on port ${PORT}`));
