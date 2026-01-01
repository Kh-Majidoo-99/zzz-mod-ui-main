import React, { useState } from 'react';
import '../styles/Search.css';
import { useNavigate } from 'react-router-dom';

interface SearchProps {
  showNsfw?: boolean;
  onToggleNsfw?: () => void;
}

const Search: React.FC<SearchProps> = ({ showNsfw, onToggleNsfw }) => {
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
    <div className="search-container" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
      {onToggleNsfw && (
        <button
          onClick={onToggleNsfw}
          className="search-button"
          style={{
            backgroundColor: showNsfw ? '#dc3545' : '#6c757d',
            width: 'auto',
            padding: '0 15px'
          }}
        >
          {showNsfw ? 'Hide NSFW' : 'Show NSFW'}
        </button>
      )}
    </div>
  );
};

export default Search;
