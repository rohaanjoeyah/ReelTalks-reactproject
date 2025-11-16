// src/components/SearchBar.jsx
import React from 'react';

const SearchBar = ({ value, onChange, placeholder = 'Search movies...' }) => {
  return (
    <div className="searchbar">
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
