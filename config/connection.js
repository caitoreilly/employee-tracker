// import mysql2 package
const mysql = require("mysql2");
require("dotenv").config();

// code that will connect the app to the MySQL database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log("Connected to the employee database.")
);

// export file bc it is its own module now
module.exports = db;
