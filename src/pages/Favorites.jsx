import MovieCard from "../components/MovieCard";
import { useMoveieContext } from "../contexts/MovieContext";
import "../css/Favorites.css";

function Favorites() {
  const { favorites } = useMoveieContext();

    if (favorites) {
      return (
        <div className="favorites">
          <h2>Your Favorite Movies</h2>
          <p>{favorites.length} movies</p>
            <div className="movies-grid">
            {favorites.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
            ))}
            </div>
        </div>
      );
    }

  return (
    <div className="favorites-empty">
      <h2>No Favorites Movies Yet</h2>
      <p>Start adding movies to your favorite</p>
    </div>
  );
}

export default Favorites;