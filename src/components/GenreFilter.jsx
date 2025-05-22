import React from 'react';
import '../css/GenreFilter.css';

const GenreFilter = ({ genres, selectedGenres, onGenreSelect }) => {
  return (
    <div className="genre-filter">
      <h3>Filter by Genre</h3>
      <div className="genre-buttons">
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