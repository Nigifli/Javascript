const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "nyiltnap"
});

module.exports = pool;