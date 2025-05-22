import React from 'react';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';
import '../css/MovieList.css';

const MovieList = ({ movies, title, maxMovies = 20, showViewAll = true, viewAllLink, horizontalScroll = true }) => {
  if (!movies || movies.length === 0) {
    return (
      <div className="movie-list-container">
        <h2>{title}</h2>
        <p className="no-movies">No movies found.</p>
      </div>
    );
  }

  // For horizontal scrolling, limit to maxMovies
  // For grid layout, show all movies
  const moviesToShow = maxMovies && horizontalScroll ? movies.slice(0, maxMovies) : movies;
  
  // Calculate how many movies to show without scrolling (visible count)
  const visibleCount = horizontalScroll ? 5 : moviesToShow.length;
  const initialMovies = moviesToShow.slice(0, visibleCount);
  const scrollableMovies = horizontalScroll ? moviesToShow.slice(visibleCount) : [];

  return (
    <div className="movie-list-container">
      <div className="movie-list-header">
        {title && <h2>{title}</h2>}
        {showViewAll && viewAllLink && (
          <Link to={viewAllLink} className="view-all-button">
            View All
          </Link>
        )}
      </div>
      <div className={`movie-list ${horizontalScroll ? 'horizontal-scroll' : ''}`}>
        {initialMovies.map(movie => (
          <div className="movie-list-item initial" key={movie.id}>
            <MovieCard movie={movie} />
          </div>
        ))}
        {scrollableMovies.map(movie => (
          <div className="movie-list-item scrollable" key={movie.id}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;