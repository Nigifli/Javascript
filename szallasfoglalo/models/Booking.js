class Booking {
    constructor(userId, hotelId, checkIn, checkOut) {
        this.userId = userId;
        this.hotelId = hotelId;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
    }
}

module.exports = Booking;