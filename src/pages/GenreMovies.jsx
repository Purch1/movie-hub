import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMoviesByGenre, getGenres } from '../services/api';
import MovieList from '../components/MovieList';
import Pagination from '../components/Pagination';
import '../css/Home.css';

const GenreMovies = () => {
  const [movies, setMovies] = useState([]);
  const [genreName, setGenreName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { id } = useParams();

  useEffect(() => {
    const fetchGenreData = async () => {
      try {
        setLoading(true);
        
        // Fetch genre name and movies in parallel
        const [genreList, moviesData] = await Promise.all([
          getGenres(),
          getMoviesByGenre(id, currentPage)
        ]);
        
        // Find the genre name
        const genre = genreList.find(g => g.id === parseInt(id));
        if (genre) {
          setGenreName(genre.name);
        }
        
        setMovies(moviesData.results);
        setTotalPages(moviesData.total_pages);
        setError(null);
      } catch (err) {
        console.error('Error fetching genre movies:', err);
        setError('Failed to load movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchGenreData();
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="home">
      <h1 className="page-title">{genreName} Movies</h1>
      <p className="page-description">
        Browse our collection of {genreName.toLowerCase()} films.
      </p>
      
        <Link to="/" className="back-button">Back to Home</Link>

      {error && <div className="error-message">{error}</div>}
      
      {loading ? (
        <div className="loading">
          <div className="loading-reel">
            <div className="reel-hole"></div>
            <div className="reel-hole"></div>
            <div className="reel-hole"></div>
            <div className="reel-hole"></div>
          </div>
          <div className="loading-text">Loading movies...</div>
        </div>
      ) : (
        <>
          <MovieList 
            movies={movies} 
            showViewAll={false}
            horizontalScroll={false}
            maxMovies={15}
          />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.min(totalPages, 500)}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default GenreMovies;