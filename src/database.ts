import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db: any;

export const initializeDatabase = async () => {
  db = await open({
    filename: './history-app.db',
    driver: sqlite3.Database
  });

  // Create tables if they don't exist
  await db.run(`
    CREATE TABLE IF NOT EXISTS Themes (
      theme_id INTEGER PRIMARY KEY,
      theme_name TEXT
    )
  `);

  await db.run(`
    CREATE TABLE IF NOT EXISTS TimePrecisions (
      precision_id INTEGER PRIMARY KEY,
      precision_value INTEGER,
      theme_id INTEGER,
      FOREIGN KEY(theme_id) REFERENCES Themes(theme_id)
    )
  `);

  await db.run(`
    CREATE TABLE IF NOT EXISTS TimePeriods (
      period_id INTEGER PRIMARY KEY,
      period_value TEXT,
      precision_id INTEGER,
      FOREIGN KEY(precision_id) REFERENCES TimePrecisions(precision_id)
    )
  `);

  await db.run(`
    CREATE TABLE IF NOT EXISTS Locations (
      location_id INTEGER PRIMARY KEY,
      location_name TEXT,
      period_id INTEGER,
      FOREIGN KEY(period_id) REFERENCES TimePeriods(period_id)
    )
  `);

  await db.run(`
    CREATE TABLE IF NOT EXISTS Events (
      event_id INTEGER PRIMARY KEY,
      event_name TEXT,
      description TEXT,
      theme_id INTEGER,
      precision_id INTEGER,
      period_id INTEGER,
      location_id INTEGER,
      FOREIGN KEY(theme_id) REFERENCES Themes(theme_id),
      FOREIGN KEY(precision_id) REFERENCES TimePrecisions(precision_id),
      FOREIGN KEY(period_id) REFERENCES TimePeriods(period_id),
      FOREIGN KEY(location_id) REFERENCES Locations(location_id)
    )
  `);
};

// CRUD Operations

// Themes
export const insertTheme = async (themeName: string) => {
  await db.run('INSERT INTO Themes (theme_name) VALUES (?)', themeName);
};

export const getThemes = async () => {
  return await db.all('SELECT * FROM Themes');
};

export const updateTheme = async (themeId: number, newThemeName: string) => {
  await db.run('UPDATE Themes SET theme_name = ? WHERE theme_id = ?', [newThemeName, themeId]);
};

export const deleteTheme = async (themeId: number) => {
  await db.run('DELETE FROM Themes WHERE theme_id = ?', themeId);
};

// ... Similarly, create functions for other tables (TimePrecisions, TimePeriods, Locations, Events)

initializeDatabase();
