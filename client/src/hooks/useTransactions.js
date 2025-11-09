const BASE_URL = "http://localhost:5000";

export async function fetchTransactions() {
  const res = await fetch(`${BASE_URL}/transactions`);
  return res.json();
}

export async function addTransaction(transaction) {
  const res = await fetch(`${BASE_URL}/transactions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(transaction),
  });
  return res.json();
}

export async function deleteTransactionRequest(id) {
  const res = await fetch(`${BASE_URL}/transactions/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
