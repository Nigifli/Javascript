import db from  './db.js';

db.prepare(
    `CREATE TABLE IF NOT EXISTS cars (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT,
    model TEXT,
    year INTEGER
    )`,
).run();

export const getCars = () => db.prepare('SELECT * FROM cars').all();

export const getCarsById = (id) => db.prepare('SELECT * FROM cars WHERE id = ?').get(id);

export const createCar = (brand, model, year) => db.prepare('INSERT INTO cars (brand, model, year) VALUES (?, ?, ?)').run(brand, model, year);

export const updateCar = (id, brand, model, year) => db.prepare('UPDATE cars SET brand = ?, model = ?, year = ? WHERE id = ?').run(brand, model, year, id);