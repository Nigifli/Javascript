const express = require('express');
const router = express.Router();
const db = require('../services/db');

router.get('/', async (req, res) => {
    try {
        const { location, minPrice, maxPrice, rating } = req.query;
        let sql = `
            SELECT * FROM hotels
            WHERE 1=1
        `;
        const params = [];

        if (location) {
            sql += ' AND location LIKE ?';
            params.push(`${location}%`);
        }

        if (minPrice && maxPrice) {
            sql += ' AND price_per_night BETWEEN ? AND ?';
            params.push(minPrice, maxPrice);
        }

        if (rating) {
            sql += ' AND rating >= ?';
            params.push(rating);
        }

        const hotels = await db.all(sql, params);
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ error: 'Szállodák lekérdezése sikertelen' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const hotel = await db.get('SELECT * FROM hotels WHERE id = ?', [req.params.id]);
        if (!hotel) return res.status(404).json({ error: 'Szálloda nem található' });
        res.json(hotel);
    } catch (error) {
        res.status(500).json({ error: 'Szálloda lekérdezése sikertelen' });
    }
});

module.exports = router;