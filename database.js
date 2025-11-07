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
  const statement = db.prepare(`
    INSERT INTO transactions (date, description, category, amount, type)
    VALUES (?, ?, ?, ?, ?)
    `);
  const info = statement.run(date, description, category, amount, type);
  return info.lastInsertRowid;
}

export function getAllTransactions() {
  const statement = db.prepare("SELECT * FROM transactions ORDER BY date DESC");
  return statement.all();
}

export function deleteTransaction(id) {
  const statement = db.prepare("DELETE FROM transactions WHERE id = ?");
  return statement.run(id);
}
