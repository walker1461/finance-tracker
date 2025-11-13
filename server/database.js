import Database from "better-sqlite3";

const db = new Database("finance.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    amount REAL NOT NULL,
    type TEXT NOT NULL
    )
`);

export function getAllTransactions() {
  const rows = db.prepare("SELECT * FROM transactions").all();
  return rows.map((t) => ({
    ...t,
    category: parseCategory(t.category),
  }));
}

export function addTransaction({ date, description, category, amount, type }) {
  const stmt = db.prepare(`
    INSERT INTO transactions (date, description, category, amount, type)
    VALUES (?, ?, ?, ?, ?)
  `);

  const info = stmt.run(
    date,
    description,
    JSON.stringify(category),
    parseFloat(amount),
    type
  );

  return {
    id: info.lastInsertRowid,
    date,
    description,
    category,
    amount: parseFloat(amount),
    type,
  };
}

function parseCategory(category) {
  try {
    const parsed = JSON.parse(category);
    if (Array.isArray(parsed)) return parsed;
  } catch {
    // not JSON
  }
  if (typeof category === "string" && category.includes(",")) {
    return category.split(",").map((c) => c.trim());
  }
  return category ? [category] : [];
}

export function deleteTransaction(id) {
  const stmt = db.prepare("DELETE FROM transactions WHERE id = ?");
  return stmt.run(id);
}

export function updateTransaction(
  id,
  { date, description, category, amount, type }
) {
  const stmt = db.prepare(
    `UPDATE transactions SET date = ?, description = ?, category = ?, amount = ?, type = ? WHERE id = ?`
  );
  stmt.run(
    date,
    description,
    JSON.stringify(category),
    parseFloat(amount),
    type,
    id
  );
  return {
    date,
    description,
    category,
    amount: parseFloat(amount),
    type,
    id,
  };
}
