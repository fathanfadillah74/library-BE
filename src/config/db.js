const { Pool } = require('pg');
const config = require('./config');

const pool = new Pool({
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  database: config.database.name,
  port: config.database.port
})

const createTablesQuery = `
  CREATE TABLE IF NOT EXISTS books (
    book_id TEXT PRIMARY KEY,
    title TEXT(255) NOT NULL,
    authors TEXT(255) NOT NULL,
    published_date TEXT,
    description TEXT,
    page_count TEXT,
    thumbnail TEXT(255),
    language TEXT(50),
    preview_link TEXT(255)
  );

  CREATE TABLE IF NOT EXISTS users (
    user_id TEXT PRIMARY KEY,
    name TEXT(255) NOT NULL,
    email TEXT(255) UNIQUE NOT NULL,
    password TEXT(255) NOT NULL,
    phone TEXT(50),
    address TEXT
  );

  CREATE TABLE IF NOT EXISTS wishlist (
    wishlist_id TEXT PRIMARY KEY,
    user_id TEXT REFERENCES users(user_id),
    book_id TEXT REFERENCES books(book_id),
    date_added TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_DATE
  );
`;

const runMigrations = async () => {
  try {
    await client.connect();
    await client.query(createTablesQuery);
    console.log('Migrasi berhasil dijalankan!');
  } catch (error) {
    console.error('Error menjalankan migrasi:', error);
  } finally {
    await client.end();
  }
};

runMigrations();

module.exports = {
  query: (text, params) => pool.query(text, params)
};