import React from 'react';
import type { Hotel } from '../types';

interface Props {
  hotel: Hotel;
  onSelect: (hotel: Hotel) => void;
}

const HotelCard: React.FC<Props> = ({hotel, onSelect}) => {
  return (
    <div className="card" style={{width: '280px'}}>
      <div className="hotel-image">{hotel.image}</div>
      <div className="hotel-content">
        <div className="hotel-name">{hotel.name}</div>
        <div className="hotel-location">{hotel.location}</div>
        <div className="hotel-price">{hotel.price_per_night.toLocaleString()} Ft / éjszaka</div>
        <button className="button" style={{marginTop:'12px'}} onClick={()=>onSelect(hotel)}>Foglalás</button>
      </div>
    </div>
  );
};

export default HotelCard;
