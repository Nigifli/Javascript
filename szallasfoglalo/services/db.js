const sqlite = require('better-sqlite3');
const path = require('path');

const db = new sqlite(path.resolve('hotel_booking.db'), {fileMustExist: true});

const getHotels = () => {
    return db.prepare(`
        SELECT h.*, AVG(b.rating) as avg_rating
        FROM hotels h
        LEFT JOIN bookings b ON h.id = b.hotel_id
        GROUP BY h.id
    `).all();
};

const getHotelById = (id) => {
    return db.prepare('SELECT * FROM hotels WHERE id = ?').get(id);
};

const getBookingsByUser = (userId) => {
    return db.prepare(`
        SELECT b.*, h.name as hotel_name, h.location
        FROM bookings b
        JOIN hotels h ON b.hotel_id = h.id
        WHERE b.user_id = ?
        ORDER BY b.check_in DESC
    `).all(userId);
};

const getUserByEmail = (email) => {
    return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
};

module.exports = {
    getHotels,
    getHotelById,
    getBookingsByUser,
    getUserByEmail
}; 