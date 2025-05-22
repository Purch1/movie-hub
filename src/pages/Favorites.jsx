import { useMoveieContext } from "../contexts/MovieContext";
import "../css/Favorites.css";

function Favorites() {
  const { favorites } = useMoveieContext();

  return (
    <div className="favorites-empty">
      <h2>No Favorites Movies Yet</h2>
      <p>Start adding movies to your favorite</p>
    </div>
  );
}

export default Favorites;