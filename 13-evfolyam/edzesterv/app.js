const express = require("express");
const cors = require("cors");
const db = require("./data/db");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/hosszu/:perc", (req, res) => {
    const perc = Number(req.params.perc);

    if (isNaN(perc)) {
        return res.status(400).json({message: "Hibas ido!"})
    }   
    
    const sorok = db.prepare(`
        SELECT nev, tipus, ido FROM edzesek WHERE ido >= ?    
    `).all(perc);

    res.json(sorok);
});

app.get("/vendeg", (req, res) => {
    const {nev} = req.query;

    if (!nev) {
        return res.status(400).json({message: "Adja meg a nevet!"})
    }

    const sorok = db.prepare(`
        SELECT tipus, ido, datum
        FROM edzesek
        WHERE nev = ?
    `).all(nev);

    res.json(sorok);
});

app.get("/aktiv/:darab", (req, res) => {
    const edzesekSzama = Number(req.params.edzesekSzama);

    if (!isNaN(edzesekSzama)) {
        return res.status(400).json({message: "Helytelen adat!"})
    }

    const sorok = db.prepare(`
        SELECT nev,
        COUNT(*) AS edzesek_szama
        FROM edzesek
        GROUP BY nev
        HAVING COUNT(*) >= ?
    `).all(edzesekSzama);

    res.json(sorok);
});

