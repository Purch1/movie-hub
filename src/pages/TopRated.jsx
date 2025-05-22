import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTopRatedMovies } from '../services/api';
import MovieList from '../components/MovieList';
import Pagination from '../components/Pagination';
import '../css/Home.css'; // Reusing Home CSS since the layout is similar

const TopRated = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        setLoading(true);
        const data = await getTopRatedMovies(currentPage);
        setMovies(data.results);
        setTotalPages(data.total_pages);
        setError(null);
      } catch (err) {
        console.error('Error fetching top rated movies:', err);
        setError('Failed to load top rated movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTopRatedMovies();
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="home">
      <h1 className="page-title">Top Rated Movies</h1>
      <p className="page-description">
        Discover critically acclaimed films with the highest ratings from audiences around the world.
      </p>
      
      <Link to="/" className="back-button green-back-button">Back to Home</Link>

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

export default TopRated;