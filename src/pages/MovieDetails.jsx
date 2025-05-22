import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../services/api';
import { useMoveieContext } from '../contexts/MovieContext';
import '../css/MovieDetails.css';

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { isFavorite, addToFavorites, removeFromFavorites } = useMoveieContext();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const data = await getMovieDetails(id);
        setMovie(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load movie details');
        setLoading(false);
        console.error(err);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleFavoriteClick = () => {
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  if (loading) return <div className="movie-details-loading">Loading...</div>;
  if (error) return <div className="movie-details-error">{error}</div>;
  if (!movie) return <div className="movie-details-error">Movie not found</div>;

  return (
    <div className="movie-details-container">
      <div className="movie-details-backdrop" 
           style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}>
        <div className="backdrop-overlay"></div>
      </div>
      
      <div className="movie-details-content">
        <div className="movie-details-poster">
          <img 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            alt={movie.title} 
          />
        </div>
        
        <div className="movie-details-info">
          <h1>{movie.title} <span className="movie-year">({movie.release_date?.split('-')[0]})</span></h1>
          
          <div className="movie-stats">
            <span className="movie-rating">⭐ {movie.vote_average.toFixed(1)}/10</span>
            <span className="movie-runtime">{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
            <button 
              className={`favorite-btn-details ${isFavorite(movie.id) ? 'active' : ''}`} 
              onClick={handleFavoriteClick}
            >
              {isFavorite(movie.id) ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
            </button>
          </div>
          
          <div className="movie-genres">
            {movie.genres.map(genre => (
              <span key={genre.id} className="genre-tag">{genre.name}</span>
            ))}
          </div>
          
          <div className="movie-tagline">{movie.tagline}</div>
          
          <div className="movie-overview">
            <h3>Overview</h3>
            <p>{movie.overview}</p>
          </div>
          
          <div className="movie-additional-info">
            <div className="info-item">
              <h4>Release Date</h4>
              <p>{new Date(movie.release_date).toLocaleDateString()}</p>
            </div>
            <div className="info-item">
              <h4>Budget</h4>
              <p>${movie.budget.toLocaleString()}</p>
            </div>
            <div className="info-item">
              <h4>Revenue</h4>
              <p>${movie.revenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;