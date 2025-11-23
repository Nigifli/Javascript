class Hotel {
    constructor(name, location, pricePerNight, description, imageUrl, rating) {
        this.name = name;
        this.location = location;
        this.pricePerNight = pricePerNight;
        this.description = description;
        this.imageUrl = imageUrl;
        this.rating = rating;
    }
}

module.exports = Hotel;