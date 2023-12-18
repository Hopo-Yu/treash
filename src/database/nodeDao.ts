import { open } from 'sqlite';
import { Database } from 'sqlite3';

const openDb = async () => {
  return open({
    filename: './your_database_path.db',
    driver: Database
  });
};

export const createNode = async (title: string, description: string, filePaths: string, linkedNodeIDs: string) => {
  const db = await openDb();
  const statement = await db.prepare(`INSERT INTO Node (Title, Description, FilePaths, LinkedNodeIDs) VALUES (?, ?, ?, ?)`);
  await statement.run(title, description, filePaths, linkedNodeIDs);
  await statement.finalize();
  return db.get('SELECT last_insert_rowid() as NodeID');
};

export const getNodeById = async (nodeId: number) => {
  const db = await openDb();
  return db.get(`SELECT * FROM Node WHERE NodeID = ?`, nodeId);
};

export const updateNode = async (nodeId: number, title: string, description: string, filePaths: string, linkedNodeIDs: string) => {
  const db = await openDb();
  await db.run(`UPDATE Node SET Title = ?, Description = ?, FilePaths = ?, LinkedNodeIDs = ? WHERE NodeID = ?`, title, description, filePaths, linkedNodeIDs, nodeId);
};

export const deleteNode = async (nodeId: number) => {
  const db = await openDb();
  await db.run(`DELETE FROM Node WHERE NodeID = ?`, nodeId);
};

export const getAllNodes = async () => {
  const db = await openDb();
  return db.all(`SELECT * FROM Node`);
};
