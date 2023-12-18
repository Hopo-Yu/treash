import { open } from 'sqlite';
import { Database } from 'sqlite3';

const openDb = async () => {
  return open({
    filename: './your_database_path.db',
    driver: Database
  });
};

export const addNodeTag = async (nodeId: number, tagId: number) => {
  const db = await openDb();
  const statement = await db.prepare(`INSERT INTO NodeTag (NodeID, TagID) VALUES (?, ?)`);
  await statement.run(nodeId, tagId);
  await statement.finalize();
};

export const removeNodeTag = async (nodeId: number, tagId: number) => {
  const db = await openDb();
  await db.run(`DELETE FROM NodeTag WHERE NodeID = ? AND TagID = ?`, nodeId, tagId);
};

export const getNodeTags = async (nodeId: number) => {
  const db = await openDb();
  return db.all(`SELECT TagID FROM NodeTag WHERE NodeID = ?`, nodeId);
};
