const Database = require("better-sqlite3");

const db = new Database("fitnesz.sql");

db.prepare(`˙
    CREATE TABLE IF NOT EXISTS edzesek (
    azon INTEGER PRIMARY KEY AUTOINCREMENT,
    nev TEXT,
    tipus TEXT CHECK(tipus IN ('kardio', 'ero', 'joga', 'crossfit')),
    ido INTEGER,
    kaloria INTEGER,
    datum DATE
    )
`).run();