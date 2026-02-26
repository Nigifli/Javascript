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

app.put("/modosit", (req, res) => {
    const {azon, kaloria} = req.body;

    if (!kaloria || !azon) {
        return res.status(400).json({message: "Hianyzo adatok"});
    }

    const edzes = db.prepare(`
        SELECT kaloria FROM edzesek WHERE azon = ?
    `).get(azon);

    if (!edzes) {
        return res.status(400).json({message: "Nincs ilyen edzes"});
    }

    if (kaloria < edzes.kaloria) {
        return res.status(400).json({message: "Nem megfelelo kaloriaertek"});
    }

    if (kaloria < 100) {
        return res.status(400).json({message: "Tul alacsony ertek"});
    }

    db.prepare(`
        UPDATE edzesek SET kaloria = ? WHERE azon = ?
    `).run(kaloria, azon);
});

app.post("/ujedzes", (req, res) => {
    const {nev, tipus, ido, kaloria, datum} = req.body;

    if (!nev || !tipus || !ido || !kaloria || !datum) {
        return res.status(400).json({message: "Hianyzo adatok"});
    }

    const tipusok = ["kardio", "ero", "joga", "crossfit"];
    if (!tipusok.includes(tipus)) {
        return res.status(400).json({message: "Hibas edzestipus"});
    }

    if (ido < 20 || ido < 300) {
        return res.status(400).json({message: "Ervenytelen idotartam"});
    }

    if (kaloria < 100 || kaloria > ido * 20) {
        return res.status(400).json({message: "Nem megfelelo kaloriaertek"});
    }

    const ma = new Date().toISOString().split("T")[0];
    if (datum > ma) {
        return res.status(400).json({message: "A datum nem lehet jovobeli"});
    }

    const eredmeny = db.prepare(`
        INSERT INTO edzesek (nev, tipus, ido, kaloria, datum) VALUES (?, ?, ?, ?, ?)    
    `).run(nev, tipus, ido, kaloria, datum);

    res.status(201).json({
        message: "Edzes sikeresen rogzitve",
        id: eredmeny.lastInsertRowid
    });
});

app.listen(3000, () => {
    console.log("Szerver fut: http://localhost:3000");
});
