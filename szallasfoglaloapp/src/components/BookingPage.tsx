import React, { useState } from 'react';
import type { Hotel } from '../types';
import { calculateNights, calculateTotal } from '../utils/calculations';

interface Props {
  selectedHotel: Hotel;
  onBook: (hotel: Hotel, checkIn: string, checkOut: string) => void;
}

const BookingPage: React.FC<Props> = ({ selectedHotel, onBook }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const nights = calculateNights(checkIn, checkOut);
  const total = calculateTotal(selectedHotel.price_per_night, checkIn, checkOut);

  return (
    <div className="container">
      <button onClick={() => window.location.reload()} style={{ marginBottom: '20px' }}>
        &larr; Vissza
      </button>

      <div className="card">
        <div className="hotel-image">{selectedHotel.image}</div>
        <div className="hotel-content">
          <div className="hotel-name">{selectedHotel.name}</div>
          <div className="hotel-location">{selectedHotel.location}</div>
          <p>{selectedHotel.description}</p>

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

          {nights > 0 && (
            <div className="booking-summary">
              <div><span>Éjszakák:</span><span>{nights}</span></div>
              <div><span>Ár/éjszaka:</span><span>{selectedHotel.price_per_night.toLocaleString()} Ft</span></div>
              <div><span>Teljes ár:</span><span>{total.toLocaleString()} Ft</span></div>
            </div>
          )}

          <button
            className="button"
            onClick={() => onBook(selectedHotel, checkIn, checkOut)}
          >
            Foglalás megerősítése
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
