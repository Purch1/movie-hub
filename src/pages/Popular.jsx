import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPopularMovies } from '../services/api';
import MovieList from '../components/MovieList';
import Pagination from '../components/Pagination';
import '../css/Home.css';

const Popular = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        setLoading(true);
        const data = await getPopularMovies(currentPage);
        setMovies(data.results);
        setTotalPages(data.total_pages);
        setError(null);
      } catch (err) {
        console.error('Error fetching popular movies:', err);
        setError('Failed to load popular movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPopularMovies();
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="home">
           
      <h1 className="page-title">Popular Movies</h1>
      <p className="page-description">
        Discover the most trending and popular movies being watched right now.
      </p>

        <Link to="/" className="back-button">Back to Home</Link>

      {error && <div className="error-message">{error}</div>}
      
      {loading ? (
        <div className="loading">Loading...</div>
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
              totalPages={Math.min(totalPages, 500)} // TMDb limits to 500 pages
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Popular;