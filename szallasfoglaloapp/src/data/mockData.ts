import type { User, Hotel, Booking } from '../types';

export const mockUsers: User[] = [
  { id: 1, name: "Kovács János", email: "janos@example.com", password_hash: "hash123" }
];

export const mockHotels: Hotel[] = [
  { id: 1, name: "Duna Palace Hotel", location: "Budapest", price_per_night: 25000, image: "🏨", rating: 4.5, description: "Luxus szálloda a Duna partján" },
  { id: 2, name: "Thermal Resort", location: "Hévíz", price_per_night: 18000, image: "♨️", rating: 4.3, description: "Gyógyszálloda termálfürdővel" },
  { id: 3, name: "Lake View Inn", location: "Balaton", price_per_night: 15000, image: "🏖️", rating: 4.7, description: "Panorámás kilátás a Balatonra" },
  { id: 4, name: "Castle Hotel", location: "Eger", price_per_night: 20000, image: "🏰", rating: 4.4, description: "Történelmi várszálloda" },
  { id: 5, name: "Wine Country Lodge", location: "Tokaj", price_per_night: 16000, image: "🍷", rating: 4.6, description: "Borászati élmény a szívében" }
];

export const mockBookings: Booking[] = [];
