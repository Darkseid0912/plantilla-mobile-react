import * as SQLite from 'expo-sqlite';

const DB_NAME = 'app.db';
const TABLE_NAME = 'users';

const db = SQLite.openDatabaseSync(DB_NAME);

export const initRegisterDatabase = async (): Promise<void> => {
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

export const findUserByEmail = async (email: string): Promise<{ id: number } | null> => {
  const row = await db.getFirstAsync<{ id: number }>(
    `SELECT id FROM ${TABLE_NAME} WHERE email = ? LIMIT 1;`,
    [email]
  );

  return row ?? null;
};

export const insertUser = async (data: {
  fullName: string;
  email: string;
  passwordHash: string;
  birthDate: string;
  phone: string;
  acceptedTerms: boolean;
  acceptedPrivacy: boolean;
}): Promise<{ id: number; createdAt: string }> => {
  const createdAt = new Date().toISOString();

  const result = await db.runAsync(
    `INSERT INTO ${TABLE_NAME}
      (full_name, email, password_hash, birth_date, phone, accepted_terms, accepted_privacy, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
    [
      data.fullName,
      data.email,
      data.passwordHash,
      data.birthDate,
      data.phone || null,
      data.acceptedTerms ? 1 : 0,
      data.acceptedPrivacy ? 1 : 0,
      createdAt,
    ]
  );

  return { id: Number(result.lastInsertRowId), createdAt };
};
