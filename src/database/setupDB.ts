import { Database } from 'sqlite3';

const dbPath = 'path_to_your_database.db'; // Adjust path as needed
const db = new Database(dbPath, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});

const createNodeTable = `
CREATE TABLE IF NOT EXISTS Node (
  NodeID INTEGER PRIMARY KEY AUTOINCREMENT,
  Title TEXT NOT NULL,
  Description TEXT,
  FilePaths JSON,
  LinkedNodeIDs JSON
);
`;

const createTagTable = `
CREATE TABLE IF NOT EXISTS Tag (
  TagID INTEGER PRIMARY KEY AUTOINCREMENT,
  TagName TEXT NOT NULL UNIQUE
);
`;

const createNodeTagTable = `
CREATE TABLE IF NOT EXISTS NodeTag (
  NodeID INTEGER,
  TagID INTEGER,
  FOREIGN KEY (NodeID) REFERENCES Node(NodeID),
  FOREIGN KEY (TagID) REFERENCES Tag(TagID),
  PRIMARY KEY (NodeID, TagID)
);
`;

// Execute SQL to create tables
db.serialize(() => {
  db.run(createNodeTable);
  db.run(createTagTable);
  db.run(createNodeTagTable);
});

// Close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Closed the database connection.');
});

export default db;
