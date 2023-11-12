import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function initializeDatabase() {
    const db = await open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    });

    // Create a table if it doesn't exist
    await db.run(`CREATE TABLE IF NOT EXISTS nodes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        metadata TEXT
    )`);

    return db;
}

async function createNode(db: any, name: string, metadata: string) {
    const stmt = await db.prepare('INSERT INTO nodes (name, metadata) VALUES (?, ?)');
    const result = await stmt.run(name, metadata);
    return result.lastID;  // Returns the ID of the newly created node
}

async function getAllNodes(db: any) {
    return await db.all('SELECT * FROM nodes');
}

async function getNodeById(db: any, id: number) {
    return await db.get('SELECT * FROM nodes WHERE id = ?', [id]);
}

async function updateNode(db: any, id: number, name: string, metadata: string) {
    const stmt = await db.prepare('UPDATE nodes SET name = ?, metadata = ? WHERE id = ?');
    await stmt.run(name, metadata, id);
}

async function deleteNode(db: any, id: number) {
    const stmt = await db.prepare('DELETE FROM nodes WHERE id = ?');
    await stmt.run(id);
}

export {
    initializeDatabase,
    createNode,
    getAllNodes,
    getNodeById,
    updateNode,
    deleteNode
};
