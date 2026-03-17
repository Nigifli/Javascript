import express from 'express';
import db from './data/db.js';

const PORT = 3000;

const app = express();

app.use(express.json());

app.get('/rengesek/telepulesek/:varmegye', (req, res) => {
    const varmegye = req.params.varmegye;
    const telepulesek = []
    res.status(200).json(telepulesek);
})

app.get('/rengesek/varmegye/statisztika', (req, res) => {
    const stat = db.prepare('').all();
    res.status(200).json(stat);
})

app.get('/rengesek/intenzitas', (req, res) => {
    const rengesek = []
    res.status(200).json(rengesek);
})

app.post('/rengesek/uj', (req, res) => {
    const { datum, ido, telepules, varmegye, magnitudo, intenzitas } = req.body;
    if (!datum || !ido || !telepules || !varmegye || !magnitudo || !intenzitas) {
        return res.status(400).json({ message: 'Hianyzo adatok!' });
    }
    
    const hely = db.prepare('SELECT * FROM telepules WHERE nev = ?').get(telepules);

    let mentetthely;
    if (!hely) {
        const mentetthely = db.prepare('INSERT INTO telepules (nev, varmegye) VALUES (?, ?)').run(
            telepules, 
            varmegye
        );
        telepid = mentetthely.lastInsertRowId;
    } else {
        telepid = hely.id;
    }

    const mentettRenges = db.prepare('INSERT INTO naplo (datum, ido, telepid, magnitudo, intenzitas) VALUES (?, ?, ?, ?, ?)').run(datum, ido, telepid, magnitudo, intenzitas);
    res.status(201).json({
        message: 'Foldrenges sikeresen rogzitve!',
        id: mentettRenges.lastInsertRowid
    })
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
