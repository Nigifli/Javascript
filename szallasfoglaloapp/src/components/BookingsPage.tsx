import React from 'react';
import type { Booking } from '../types';
import { calculateNights, calculateTotal } from '../utils/calculations';

interface Props {
  bookings: Booking[];
}

const BookingsPage: React.FC<Props> = ({bookings}) => {
  return (
    <div className="container">
      <h2 style={{marginBottom:'20px'}}>Foglalásaim</h2>
      {bookings.length === 0 && <p>Még nincs foglalásod.</p>}
      <div className="grid">
        {bookings.map(b => (
          <div key={b.id} className="card" style={{width:'400px'}}>
            <div className="hotel-name">{b.hotel_name}</div>
            <div>{b.hotel_location}</div>
            <div>Érkezés: {b.check_in}</div>
            <div>Távozás: {b.check_out}</div>
            <div>Éjszakák: {calculateNights(b.check_in, b.check_out)}</div>
            <div>Teljes ár: {calculateTotal(b.price_per_night, b.check_in, b.check_out).toLocaleString()} Ft</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingsPage;
