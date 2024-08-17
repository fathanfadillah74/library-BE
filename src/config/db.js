const { Pool } = require('pg');
const config = require('./config');

const pool = new Pool({
  host: config.database.host,
  user: config.database.user,
  password: config.database.password || "kenari01",
  database: config.database.name,
  port: config.database.port
})

module.exports = {
  query: (text, params) => pool.query(text, params)
};