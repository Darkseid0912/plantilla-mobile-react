import * as SQLite from 'expo-sqlite';

const DB_NAME = 'app.db';
const TABLE_NAME = 'users';

const db = SQLite.openDatabaseSync(DB_NAME);

export const initLoginDatabase = async (): Promise<void> => {
  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      birth_date TEXT NOT NULL,
      phone TEXT,
      accepted_terms INTEGER NOT NULL,
      accepted_privacy INTEGER NOT NULL,
      created_at TEXT NOT NULL
    );`
  );
};

export const getUserByEmail = async (email: string): Promise<{
  id: number;
  email: string;
  fullName: string;
  passwordHash: string;
} | null> => {
  const row = await db.getFirstAsync<{
    id: number;
    email: string;
    full_name: string;
    password_hash: string;
  }>(
    `SELECT id, email, full_name, password_hash FROM ${TABLE_NAME} WHERE email = ? LIMIT 1;`,
    [email]
  );

  if (!row) {
    return null;
  }

  return {
    id: row.id,
    email: row.email,
    fullName: row.full_name,
    passwordHash: row.password_hash,
  };
};
