const mysql = require('mysql2');
require('dotenv').config();
const dbUtils =require('./lib/dbUtils')

// Connect to database
/**
 * @type {import('mysql2').Pool}
 */
const pool = mysql.createPool(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  },
  console.log(`Connected to the database.`)
);