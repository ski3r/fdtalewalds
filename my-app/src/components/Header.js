import React from 'react';
import './styles/Header.css';

const Header = ({ filter, setFilter, onSearch }) => {
  return (
    <header className="header">
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Sök"
      />
      <button onClick={onSearch}>Sök</button>
    </header>
  );
};

export default Header;