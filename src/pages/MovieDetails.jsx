import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails, getMovieCredits, getMovieRecommendations } from '../services/api';
import { useMoveieContext } from '../contexts/MovieContext';
import MovieCard from '../components/MovieCard';
import '../css/MovieDetails.css';
import MovieList from '../components/MovieList';

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, addToFavorites, removeFromFavorites } = useMoveieContext();

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        const [movieData, creditsData, recommendationsData] = await Promise.all([
          getMovieDetails(id),
          getMovieCredits(id),
          getMovieRecommendations(id)
        ]);
        
        setMovie(movieData);
        setCredits(creditsData);
        setRecommendations(recommendationsData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load movie data');
        setLoading(false);
        console.error(err);
      }
    };

    fetchMovieData();
    // Scroll to top when movie ID changes
    window.scrollTo(0, 0);
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

  // Get top cast (limited to 6)
  const topCast = credits?.cast?.slice(0, 6) || [];

  return (
    <div className="movie-details-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>
      
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
      
      {/* Cast Section */}
      {topCast.length > 0 && (
        <div className="cast-section">
          <h2>Top Cast</h2>
          <div className="cast-list">
            {topCast.map(person => (
              <div key={person.id} className="cast-item">
                <div className="cast-profile">
                  {person.profile_path ? (
                    <img 
                      src={`https://image.tmdb.org/t/p/w185${person.profile_path}`} 
                      alt={person.name}
                    />
                  ) : (
                    <div className="no-profile">
                      <span>No Image</span>
                    </div>
                  )}
                </div>
                <div className="cast-info">
                  <h4>{person.name}</h4>
                  <p>{person.character}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Recommendations Section */}
      {recommendations.length > 0 && (
        <div className="recommendations-section">
          <h2>You May Also Like</h2>
          <div className="movie-list horizontal-scroll">
            {recommendations.map(movie => (
              <div className="movie-list-item" key={movie.id}>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;