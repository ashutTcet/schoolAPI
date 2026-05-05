const mysql = require("mysql2");

const db = mysql.createConnection(process.env.MYSQLURL, {
  ssl: {
    rejectUnauthorized: false,
  },
});

db.connect((err) => {
  if (err) {
    console.error("DB Error:", err);
  } else {
    console.log("Connected to Railway DB");
  }
});

module.exports = db;
