import React from 'react';
import MovieCard from './MovieCard';
import '../css/MovieList.css';

const MovieList = ({ movies, title }) => {
  if (!movies || movies.length === 0) {
    return (
      <div className="movie-list-container">
        <h2>{title}</h2>
        <p className="no-movies">No movies found.</p>
      </div>
    );
  }

  return (
    <div className="movie-list-container">
      {title && <h2>{title}</h2>}
      <div className="movie-list">
        {movies.map(movie => (
          <div className="movie-list-item" key={movie.id}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;