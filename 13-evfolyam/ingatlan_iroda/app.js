const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/nagy/:terulet", (req, res) => {
    const terulet = parseFloat(req.params.terulet);

    const sql = `
        SELECT 
            CONCAT(i.kozterulet, ' ', i.hazszam) AS cim,
            SUM(h.hossz * h.szel) AS terulet,
            (
                SELECT ar 
                FROM hirdetes 
                WHERE ingatlanid = i.id 
                ORDER BY datum DESC 
                LIMIT 1
            ) AS ar
        FROM ingatlan i
        JOIN helyiseg h ON i.id = h.ingatlanid
        GROUP BY i.id
        HAVING terulet >= ?
    `;

    db.query(sql, [terulet], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

app.get("/aktivhirdetes", (req, res) => {
    const sql = `
        SELECT 
            CONCAT(i.kozterulet, ' ', i.hazszam) AS cim,
            h.datum
        FROM hirdetes h
        JOIN ingatlan i ON i.id = h.ingatlanid
        WHERE h.allapot != 'eladva'
        AND h.id IN (
            SELECT MAX(id)
            FROM hirdetes
            GROUP BY ingatlanid
        )
    `;

    db.query(sql, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

app.get("/szobaszam/:darab", (req, res) => {
    const darab = parseInt(req.params.darab);

    const sql = `
        SELECT CONCAT(i.kozterulet, ' ', i.hazszam) AS cim
        FROM ingatlan i
        JOIN helyiseg h ON i.id = h.ingatlanid
        GROUP BY i.id
        HAVING COUNT(h.id) >= ?
    `;

    db.query(sql, [darab], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

app.put("/aratmodosit", (req, res) => {
    const { id, ar } = req.body;

    if (!ar || ar < 1000000) {
        return res.status(400).json({ message: "Érvénytelen ár." });
    }

    db.query("SELECT * FROM ingatlan WHERE id = ?", [id], (err, ingatlan) => {
        if (!ingatlan || ingatlan.length === 0) {
            return res.status(404).json({ message: "Nincs ilyen ingatlan." });
        }

        const sql = `
            INSERT INTO hirdetes (ingatlanid, ar, allapot, datum)
            VALUES (?, ?, 'módosítva', NOW())
        `;

        db.query(sql, [id, ar], (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Ár módosítva." });
        });
    });
});

app.post("/ujhelyiseg", (req, res) => {
    const { ingatlanid, hossz, szel, funkcio } = req.body;

    if (!ingatlanid || !hossz || !szel || !funkcio) {
        return res.status(400).json({ message: "Hiányzó adatok." });
    }

    if (hossz < 1 || hossz > 20 || szel < 1 || szel > 20) {
        return res.status(400).json({ message: "Érvénytelen méret." });
    }

    db.query("SELECT * FROM ingatlan WHERE id = ?", [ingatlanid], (err, ingatlan) => {
        if (!ingatlan || ingatlan.length === 0) {
            return res.status(404).json({ message: "Nincs ilyen ingatlan." });
        }

        const insertSql = `
            INSERT INTO helyiseg (ingatlanid, hossz, szel, funkcio)
            VALUES (?, ?, ?, ?)
        `;

        db.query(insertSql, [ingatlanid, hossz, szel, funkcio], (err, result) => {
            if (err) return res.status(500).json(err);

            res.status(201).json({
                message: "Helyiség rögzítve.",
                id: result.insertId
            });
        });
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
