import React from "react";
import { useMovieContext } from "../contexts/MovieContext";
import MovieList from "../components/MovieList";
import "../css/Home.css";
import "../css/Favorites.css";

function Favorites() {
  const { favorites } = useMovieContext();

  if (favorites && favorites.length > 0) {
    return (
      <div className="home">
        <h1 className="page-title">Your Favorite Movies</h1>
        <p className="page-description">
          Your personal collection of favorite films. You have {favorites.length} movie{favorites.length !== 1 ? 's' : ''} saved.
        </p>

        <MovieList 
          movies={favorites} 
          showViewAll={false}
          horizontalScroll={false}
        />
      </div>
    );
  }

  return (
    <div className="home">
      <h1 className="page-title">Your Favorite Movies</h1>
      <p className="page-description">
        Start adding movies to your favorites collection by clicking the heart icon on any movie.
      </p>
      
      <div className="empty-state">
        <div className="empty-state-icon">❤️</div>
        <h2>No Favorite Movies Yet</h2>
        <p>Start adding movies to your favorites</p>
      </div>
    </div>
  );
}

export default Favorites;