import React, { useState } from 'react';
import { mockHotels, mockBookings } from './data/mockData';
import type { User, Hotel, Booking } from './types';
import HomePage from './components/HomePage';
import BookingPage from './components/BookingPage';
import BookingsPage from './components/BookingsPage';
import LoginPage from './components/LoginPage';
import NavBar from './components/NavBar';
import './index.css';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home'|'booking'|'bookings'|'login'>('home');
  const [user, setUser] = useState<User | null>(null);
  const [hotels, setHotels] = useState<Hotel[]>(mockHotels);
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  const handleSearch = (location: string, checkIn: string, checkOut: string) => {
    let filtered = mockHotels;
    if (location) {
      filtered = filtered.filter(h =>
        h.location.toLowerCase().includes(location.toLowerCase()) ||
        h.name.toLowerCase().includes(location.toLowerCase())
      );
    }
    setHotels(filtered);
  };

  const handleBooking = (hotel: Hotel, checkIn: string, checkOut: string) => {
    if (!user) {
      alert('Kérjük, jelentkezz be a foglaláshoz!');
      setCurrentPage('login');
      return;
    }
    if (!checkIn || !checkOut) {
      alert('Kérjük, add meg az érkezés és távozás dátumát!');
      return;
    }
    const newBooking: Booking = {
      id: bookings.length + 1,
      user_id: user.id,
      hotel_id: hotel.id,
      hotel_name: hotel.name,
      hotel_location: hotel.location,
      price_per_night: hotel.price_per_night,
      check_in: checkIn,
      check_out: checkOut,
    };
    setBookings([...bookings, newBooking]);
    alert('Foglalás sikeres!');
    setCurrentPage('bookings');
  };

  return (
    <div>
      <NavBar user={user} setUser={setUser} setCurrentPage={setCurrentPage} />

      {currentPage === 'home' && (
        <HomePage
          hotels={hotels}
          setSelectedHotel={setSelectedHotel}
          setCurrentPage={setCurrentPage}
          onSearch={handleSearch}
        />
      )}
      {currentPage === 'booking' && selectedHotel && (
        <BookingPage
          selectedHotel={selectedHotel}
          onBook={handleBooking}
        />
      )}
      {currentPage === 'bookings' && (
        <BookingsPage
          bookings={bookings.filter(b => b.user_id === user?.id)}
        />
      )}
      {currentPage === 'login' && (
        <LoginPage setUser={setUser} setCurrentPage={setCurrentPage} />
      )}
    </div>
  );
};

export default App;
