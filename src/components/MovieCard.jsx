import { useMovieContext } from "../contexts/MovieContext";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMovieDetails, getGenres } from "../services/api";
import "../css/MovieCard.css";

function MovieCard({movie}) {
    const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
    const favorite = isFavorite(movie.id);
    const [genres, setGenres] = useState([]);
    const [movieDetails, setMovieDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Get all available genres once
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const genreList = await getGenres();
                setGenres(genreList);
            } catch (error) {
                console.error("Failed to fetch genres:", error);
            }
        };
        
        fetchGenres();
    }, []);

    // Fetch movie details immediately when component mounts
    useEffect(() => {
        const fetchMovieDetails = async () => {
            // Only fetch if we don't already have the details and movie has runtime property
            if (!movieDetails && !movie.runtime) {
                setIsLoading(true);
                try {
                    const details = await getMovieDetails(movie.id);
                    setMovieDetails(details);
                } catch (error) {
                    console.error(`Failed to fetch details for movie ${movie.id}:`, error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        // Add a small delay to avoid overwhelming the API with too many requests at once
        const timer = setTimeout(fetchMovieDetails, Math.random() * 1000);
        
        return () => clearTimeout(timer);
    }, [movie.id, movie.runtime, movieDetails]);

    function onFavoriteClick(e) {
        e.preventDefault();
        e.stopPropagation();
        if (favorite) {
            removeFromFavorites(movie.id);
        } else {
            addToFavorites(movie);
        }
    }

    // Get genre names based on genre IDs
    const getGenreNames = () => {
        if (!movie.genre_ids || !genres.length) return "";
        
        return movie.genre_ids
            .slice(0, 2) // Limit to first 2 genres
            .map(id => {
                const genre = genres.find(g => g.id === id);
                return genre ? genre.name : "";
            })
            .filter(name => name !== "")
            .join(", ");
    };

    // Format runtime from minutes to hours and minutes
    const formatRuntime = (minutes) => {
        if (!minutes || minutes === 0) return "";
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        if (hours === 0) return `${mins}m`;
        return `${hours}h ${mins > 0 ? ` ${mins}m` : ''}`;
    };

    // Get the runtime from either the movie prop (if available) or movieDetails
    const getRuntime = () => {
        return movie.runtime || movieDetails?.runtime || 0;
    };

    return (
        <Link to={`/movie/${movie.id}`} className="movie-card-link">
            <div className="movie-card">
                <div className="movie-poster">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                    <div className="movie-overlay">
                        <button className={`favorite-btn ${favorite ? 'active' : ''}`} onClick={onFavoriteClick}>
                            {favorite ? '❤️' : '🤍'}
                        </button>
                        <div className="view-details">View Details</div>
                    </div>
                    {movie.vote_average > 0 && (
                        <div className="movie-rating">
                            <span>⭐ {movie.vote_average.toFixed(1)}</span>
                        </div>
                    )}
                </div>

                <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <div className="movie-meta">
                        {movie.release_date && <span className="movie-year">{movie.release_date.split('-')[0]}</span>}
                        {getRuntime() > 0 && (
                            <span className="movie-duration">{formatRuntime(getRuntime())}</span>
                        )}
                    </div>
                    <p className="movie-genres">{getGenreNames()}</p>
                </div>
            </div>
        </Link>
    );
}

export default MovieCard;