import React, { useState } from 'react';
import '../css/GenreFilter.css';

const GenreFilter = ({ genres, selectedGenres, onGenreSelect }) => {
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth <= 768);

  const toggleGenres = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="genre-filter">
      <div className="genre-filter-header">
        <h3>Filter by Genre</h3>
        <button className="toggle-genres" onClick={toggleGenres}>
          {isCollapsed ? 'Show Genres ▼' : 'Hide Genres ▲'}
        </button>
      </div>
      <div className={`genre-buttons ${isCollapsed ? 'collapsed' : ''}`}>
        {genres.map(genre => (
          <button
            key={genre.id}
            className={`genre-button ${selectedGenres.includes(genre.id) ? 'active' : ''}`}
            onClick={() => onGenreSelect(genre.id)}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreFilter;