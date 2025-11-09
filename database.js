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

export function addTransaction({ date, description, category, amount, type }) {
  const categoryString = Array.isArray(category)
    ? category.join(",")
    : String(category);

  console.log("inserting category string:", categoryString);

  const statement = db.prepare(`
    INSERT INTO transactions (date, description, category, amount, type)
    VALUES (?, ?, ?, ?, ?)
  `);

  const info = statement.run(date, description, categoryString, amount, type);

  return info.lastInsertRowid;
}

export function getAllTransactions() {
  const rows = db.prepare(`SELECT * FROM transactions`).all();
  return rows.map((row) => ({
    ...row,
    category: row.category.split(",").map((c) => c.trim()),
  }));
}

export function deleteTransaction(id) {
  const statement = db.prepare("DELETE FROM transactions WHERE id = ?");
  return statement.run(id);
  return info.changes > 0;
}

export function updateTransaction(
  id,
  { date, description, category, amount, type }
) {
  const statement = db.prepare(
    `UPDATE transactions SET date = ?, description = ?, category = ?, amount = ?, type = ? WHERE id = ?`
  );
  return statement.run(
    date,
    description,
    JSON.stringify(category),
    amount,
    type,
    id
  );
}
