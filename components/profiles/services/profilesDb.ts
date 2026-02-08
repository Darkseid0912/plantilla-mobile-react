import * as SQLite from 'expo-sqlite';

const DB_NAME = 'app.db';
const TABLE_NAME = 'profiles';

const db = SQLite.openDatabaseSync(DB_NAME);

export const initProfilesDatabase = async (): Promise<void> => {
  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      relation TEXT,
      birth_date TEXT,
      allergies TEXT,
      doctor TEXT,
      created_at TEXT NOT NULL
    );`
  );
};

export const insertProfile = async (data: {
  userId: number;
  name: string;
  relation: string;
  birthDate: string;
  allergies: string;
  doctor: string;
}): Promise<{ id: number; createdAt: string }> => {
  const createdAt = new Date().toISOString();

  const result = await db.runAsync(
    `INSERT INTO ${TABLE_NAME}
      (user_id, name, relation, birth_date, allergies, doctor, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?);`,
    [
      data.userId,
      data.name,
      data.relation || null,
      data.birthDate || null,
      data.allergies || null,
      data.doctor || null,
      createdAt,
    ]
  );

  return { id: Number(result.lastInsertRowId), createdAt };
};

export const getProfilesByUserId = async (userId: number): Promise<Array<{ id: number; name: string }>> => {
  const rows = await db.getAllAsync<{ id: number; name: string }>(
    `SELECT id, name FROM ${TABLE_NAME} WHERE user_id = ? ORDER BY id DESC;`,
    [userId]
  );

  return rows ?? [];
};
