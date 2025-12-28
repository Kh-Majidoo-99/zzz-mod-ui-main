import React, { useState } from 'react';
import '../styles/Search.css';
import { useNavigate } from 'react-router-dom';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate(`/?q=${encodeURIComponent(query)}`);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Search for mods..."
        className="search-input"
      />
      <button onClick={handleSearchClick} className="search-button">
        Search
      </button>
    </div>
  );
};

export default Search;
