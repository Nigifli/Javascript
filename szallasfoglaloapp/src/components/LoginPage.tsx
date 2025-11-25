import React, { useState } from 'react';
import type { User } from '../types';
import { mockUsers } from '../data/mockData';

interface Props {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<'home'|'booking'|'bookings'|'login'>>;
}

const LoginPage: React.FC<Props> = ({setUser, setCurrentPage}) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const found = mockUsers.find(u => u.email === email && u.password_hash === 'hash' + password);
    if (found) {
      setUser(found);
      setCurrentPage('home');
    } else {
      alert('Hibás email vagy jelszó!');
    }
  };

  const handleRegister = () => {
    if (!name || !email || !password) {
      alert('Tölts ki minden mezőt!');
      return;
    }

    const existing = mockUsers.find(u => u.email === email);
    if (existing) {
      alert('Ez az email már regisztrálva van!');
      return;
    }

    const newUser: User = {
      id: mockUsers.length + 1,
      name,
      email,
      password_hash: 'hash' + password
    };
    mockUsers.push(newUser);
    setUser(newUser);
    setCurrentPage('home');
  };

  return (
    <div className="auth-container">
      <h2>{isRegister ? 'Regisztráció' : 'Bejelentkezés'}</h2>
      {isRegister && (
        <input
          type="text"
          placeholder="Teljes név"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      )}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Jelszó"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button className="button" onClick={isRegister ? handleRegister : handleLogin}>
        {isRegister ? 'Regisztráció' : 'Bejelentkezés'}
      </button>

      <p style={{marginTop:'16px', cursor:'pointer', color:'#2563eb'}} onClick={()=>setIsRegister(!isRegister)}>
        {isRegister ? 'Van már fiókom - Bejelentkezés' : 'Új vagyok itt - Regisztráció'}
      </p>
    </div>
  );
};

export default LoginPage;
