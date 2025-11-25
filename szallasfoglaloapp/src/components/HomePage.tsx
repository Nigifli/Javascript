import React, { useState } from 'react';
import type { Hotel } from '../types';
import '../index.css';

interface Props {
  hotels: Hotel[];
  setSelectedHotel: (hotel: Hotel) => void;
  setCurrentPage: (page: 'home'|'booking'|'bookings'|'login') => void;
  onSearch: (location: string, checkIn: string, checkOut: string) => void;
}

const HomePage: React.FC<Props> = ({ hotels, setSelectedHotel, setCurrentPage, onSearch }) => {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  return (
    <div className="container">
      <h1>Szállodák keresése</h1>

      <div className="search-panel">
        <input
          type="text"
          placeholder="Helyszín vagy szálloda"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />
        <button className="button" onClick={() => onSearch(location, checkIn, checkOut)}>
          Keresés
        </button>
      </div>

      <div className="hotel-list">
        {hotels.map(hotel => (
          <div
            key={hotel.id}
            className="card"
            onClick={() => {
              setSelectedHotel(hotel);
              setCurrentPage('booking');
            }}
          >
            <div className="hotel-image">{hotel.image}</div>
            <div className="hotel-name">{hotel.name}</div>
            <div className="hotel-location">{hotel.location}</div>
            <div className="hotel-price">{hotel.price_per_night.toLocaleString()} Ft / éjszaka</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
