export interface User {
  id: number;
  name: string;
  email: string;
  password_hash: string;
}

export interface Hotel {
  id: number;
  name: string;
  location: string;
  price_per_night: number;
  image: string;
  rating: number;
  description: string;
}

export interface Booking {
  id: number;
  user_id: number;
  hotel_id: number;
  check_in: string;
  check_out: string;
  hotel_name: string;
  hotel_location: string;
  price_per_night: number;
}

export interface AuthForm {
  name: string;
  email: string;
  password: string;
}

export interface BookingForm {
  check_in: string;
  check_out: string;
}
