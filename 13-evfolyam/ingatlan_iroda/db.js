const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "kozvetito",
    port: 3300
});

db.connect((err) => {
    if (err) {
        console.error("Adatbázis kapcsolódási hiba:", err);
    } else {
        console.log("Adatbázis csatlakoztatva.");
    }
});

module.exports = db;
