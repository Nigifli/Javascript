//import express from "express";
//import db from "./data/db.js"

const express = require("express");
const db = require("./data/db.js");

const app = express();
const PORT = 3321;
const BASE = "/nyiltnap/api/v1";

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server runs on port: ${PORT}`);
})

app.get(`${BASE}/telepules`, async (req, res) => {
    const { nev } = req.query;

    const [rows] = await db.execute(
        'SELECT nev FROM diakok WHERE telepules = ?',
        [nev]
    );

    res.json(rows);
});

app.get("/tanora", async (req, res) => {
    const [rows] = await db.execute(
        `
        SELECT datum, terem, orasorszam
        FROM orak
        WHERE tantargy = 'angol'
        ORDER BY datum, orasorszam
        `
    );
    res.json(rows);
});

app.get("/9-matematika-fizika", async (req, res) => {
    const [rows] = await db.execute(`
        SELECT DISTINCT o.*
        FROM diakok d
        JOIN kapcsolo k ON d.id = k.diakid
        JOIN orak o ON o.id = k.oraid
        WHERE d.evfolyam = 9
        AND o.tantargy IN ('matematika', 'fizika')
        `);

        res.json(rows);
});

app.get("/telepulesfo", async (req, res) => {
    const [rows] = await db.execute(`
        SELECT telepules, COUNT(*) AS letszam
        FROM diakok
        GROUP BY telepules
        ORDER BY letszam DESC
        `);
        
        res.json(rows);
});

app.get("/tantargyak", async (req, res) => {
    const [rows] = await db.execute(`
        SELECT DISTINCT tantargy
        FROM orak
        ORDER BY tantargy ASC
        `);

        res.json(rows);
});

app.get("/tanar", async (req, res) => {
    const { nev, datum } = req.query;

    const [rows] = await db.execute(`
        SELECT d.nev, d.email, d.telefon
        FROM diakok d
        JOIN kapcsolo k ON d.id = k.diakid
        JOIN orak o ON o.id = k.oraid
        WHERE o.tanar = ?
        AND o.datum = ?
        `, [nev, datum]);

        res.json(rows);
})

app.get("/telepulesrol", async (req, res) => {
    const { nev } = req.query;

    const [[diak]] = await db.execute(
        "SELECT telepules FROM diakok WHERE nev = ?",
        [nev]
    );

    const [rows] = await db.execute(`
        SELECT nev
        FROM diakok
        WHERE telepules = ?
        AND nev <> ?
        `, [diak.telepules, nev]);

        res.json(rows);
});

app.get("/szabad", async (req, res) => {
    const [rows] = await db.execute(`
        SELECT
        o.datum,
        o.orasorszam,
        a.tantargy AS targy,
        o.tanar,
        (o.ferohely - COUNT(k.diakid)) AS szabad
        FROM orak o
        LEFT JOIN kapcsolo k ON o.id = k.oraid
        GROUP BY o.id
        HAVING szabad > 0
        ORDER BY szabad DESC
        )
        `);

        res.json(rows);
})