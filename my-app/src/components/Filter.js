import React from 'react';
import './styles/Filter.css';

const Filter = ({ filter, setFilter, onSearch }) => {
  return (
    <div className="filter">
      <label>
        Filter:
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-input"
        />
      </label>
      <button onClick={onSearch} className="filter-button">Sök</button>
    </div>
  );
};

export default Filter;

