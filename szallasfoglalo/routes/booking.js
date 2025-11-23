const express = require('express');
const router = express.Router();
const db = require('../services/db');

router.post('/', async (req, res) => {
    const { userId, hotelId, check_in, check_out } = req.body;

    try {
        const existingBooking = await db.get(`
            SELECT * FROM bookings 
            WHERE hotel_id = ? AND (
                (check_in <= ? AND check_out >= ?) OR
                (check_in <= ? AND check_out >= ?) OR
                (check_in >= ? AND check_out <= ?)
            )
        `, [hotelId, check_in, check_in, check_out, check_out, check_in, check_out]);

        if (existingBooking) {
            return res.status(400).json({
                error: 'A szálloda már foglalt az adott időszakra'
            });
        }

        const result = await db.run(`
            INSERT INTO bookings (user_id, hotel_id, check_in, check_out)
            VALUES (?, ?, ?, ?)
        `, [userId, hotelId, check_in, check_out]);

        res.json({
            id: result.lastID,
            userId,
            hotelId,
            check_in,
            check_out
        });
    } catch (error) {
        res.status(500).json({ error: 'Foglalás sikertelen' });
    }
});

router.get('/', async (req, res) => {
    try {
        const { userId } = req.query;
        const bookings = await db.all(`
            SELECT b.*, h.name as hotel_name, h.location 
            FROM bookings b
            JOIN hotels h ON b.hotel_id = h.id
            WHERE b.user_id = ?
            ORDER BY b.check_in DESC
        `, [userId]);
        
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: 'Foglalások lekérdezése sikertelen' });
    }
});

module.exports = router;