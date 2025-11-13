import { useState, useEffect } from "react";
const BASE_URL = "http://localhost:5000";

export function useTransactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);
  async function fetchTransactions() {
    const res = await fetch(`${BASE_URL}/transactions`);
    const data = await res.json();
    setTransactions(data);
  }

  async function addTransaction(newTransaction) {
    const res = await fetch(`${BASE_URL}/transactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTransaction),
    });
    const data = await res.json();
    setTransactions((prev) => [...prev, data]);
  }

  async function deleteTransaction(id) {
    await fetch(`${BASE_URL}/transactions/${id}`, {
      method: "DELETE",
    });
    setTransactions((prev) => prev.filter((t) => t.id != id));
  }

  async function updateTransaction(id, updatedTransaction) {
    const res = await fetch(`${BASE_URL}/transactions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTransaction),
    });
    const data = await res.json();
    setTransactions((prev) => prev.map((t) => (t.id === id ? data : t)));
  }
  return {
    transactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    refetch: fetchTransactions,
  };
}
/* export async function fetchSingleTransaction(id) {
  const res = await fetch(`${BASE_URL}/transactions/${id}`);
  return res.json();
} */

/* export async function addTransaction(transaction) {
  const res = await fetch(`${BASE_URL}/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transaction),
  });
  return res.json();
} */

/* export async function deleteTransactionRequest(id) {
  const res = await fetch(`${BASE_URL}/transactions/${id}`, {
    method: "DELETE",
  });
  return res.json();
} */
