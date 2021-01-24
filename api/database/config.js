const mysql = require("mysql");

const config = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  supportBigNumbers: true,
  bigNumberStrings: true,
  timezone: process.env.TIMEZONE
};

const pool = mysql.createPool(config);

module.exports = pool;