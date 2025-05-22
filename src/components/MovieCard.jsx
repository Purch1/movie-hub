import { useMoveieContext } from "../contexts/MovieContext";
import { Link } from "react-router-dom";
import "../css/MovieCard.css";

function MovieCard({movie}) {
    const { isFavorite, addToFavorites, removeFromFavorites } = useMoveieContext();
    const favorite = isFavorite(movie.id);

    function onFavoriteClick(e) {
        e.preventDefault();
        e.stopPropagation();
        if (favorite) {
            removeFromFavorites(movie.id);
        } else {
            addToFavorites(movie);
        }
    }
  return (
    <Link to={`/movie/${movie.id}`} className="movie-card-link">
      <div className="movie-card">
          <div className="movie-poster">
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
           <div className="movie-overlay">
              <button className={`favorite-btn ${favorite ? 'active' : ''}`} onClick={onFavoriteClick}>{favorite ? '❤️' : '🤍'}</button>
              <div className="view-details">View Details</div>
           </div>
          </div>

          <div className="movie-info">
              <h3>{movie.title}</h3>
              <p>{movie.release_date?.split('-')[0]}</p>
          </div>
      </div>
    </Link>
  );
}

export default MovieCard;