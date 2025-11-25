import React from 'react';
import type { User } from '../types';

interface Props {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<'home'|'booking'|'bookings'|'login'>>;
}

const NavBar: React.FC<Props> = ({user, setUser, setCurrentPage}) => {
  const logout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  return (
    <div className="navbar">
      <div style={{fontWeight: 'bold', fontSize: '1.25rem', cursor: 'pointer'}} onClick={()=>setCurrentPage('home')}>
        Szállásfoglaló
      </div>
      <div style={{display:'flex', gap:'10px'}}>
        {user ? (
          <>
            <button onClick={()=>setCurrentPage('bookings')}>Foglalásaim</button>
            <button onClick={logout}>Kijelentkezés</button>
          </>
        ) : (
          <button onClick={()=>setCurrentPage('login')}>Bejelentkezés</button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
