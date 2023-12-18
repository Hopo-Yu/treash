import { open } from 'sqlite';
import { Database } from 'sqlite3';

const openDb = async () => {
  return open({
    filename: './your_database_path.db',
    driver: Database
  });
};

export const createTag = async (tagName: string) => {
  const db = await openDb();
  const statement = await db.prepare(`INSERT INTO Tag (TagName) VALUES (?)`);
  await statement.run(tagName);
  await statement.finalize();
  return db.get('SELECT last_insert_rowid() as TagID');
};

export const getTagById = async (tagId: number) => {
  const db = await openDb();
  return db.get(`SELECT * FROM Tag WHERE TagID = ?`, tagId);
};

export const getAllTags = async () => {
  const db = await openDb();
  return db.all(`SELECT * FROM Tag`);
};
