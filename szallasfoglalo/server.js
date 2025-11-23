import express, { json, static } from 'express';
import Database from 'better-sqlite3';
import bcrypt from 'bcrypt';
import cors from 'cors';
import path from 'path';

const app = express();
const db = new Database('hotel_booking.db');

app.use(cors());
app.use(json());
app.use(static('public'));

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS hotels (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        location TEXT NOT NULL,
        price_per_night REAL NOT NULL,
        description TEXT,
        image_url TEXT,
        rating REAL DEFAULT 4.5
    );

    CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        hotel_id INTEGER NOT NULL,
        check_in TEXT NOT NULL,
        check_out TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (hotel_id) REFERENCES hotels(id)
    );
`);

const insertDefaultHotels = () => {
    const stmt = db.prepare(`
        INSERT INTO hotels (name, location, price_per_night, description, image_url, rating)
        VALUES (?, ?, ?, ?, ?, ?)
    `);

    const hotels = [
        ['Danubius Hotel', 'Budapest', 25000, 'Luxus szálloda a Duna partján', 'https://example.com/hotel1.jpg', 4.8],
        ['Balaton Resort', 'Siófok', 18000, 'Modern wellness hotel a Balaton mellett', 'https://example.com/hotel2.jpg', 4.6]
    ];

    hotels.forEach(hotel => stmt.run(...hotel));
};

app.use('/api/auth', require('./routes/auth'));
app.use('/api/hotels', require('./routes/hotels'));
app.use('/api/bookings', require('./routes/bookings'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Szerver fut a ${PORT} porton`));