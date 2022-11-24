import { withSearch } from "@elastic/react-search-ui";
import { useEffect, useState } from "react";


function getYear(date) {
    const d = new Date(date);
    return d.getFullYear();
}

function MovieInfo({ results, wasSearched, isLoading }) {

    const [movie, setMovie] = useState()

    useEffect(() => {
        if (wasSearched && results.length > 0) {
            setMovie(results[0])
        }
    }, [wasSearched]);

    return (
        movie &&
        <div className="movie_info">
            <div className="movie_card">
                <img src={movie.poster_path.raw} alt={movie.title.raw} />
            </div>
            <div className="movie_details">
                <h3>{movie.title.raw}</h3>
                <div className="movie_release">
                    {getYear(movie.release_date.raw)} {movie.rating?.raw} {movie.runtime.raw} minutes
                </div>
                <div className="movie_overview">
                {movie.overview.raw}
                </div>
                <div>
                   <b>Stars:</b> {movie.cast.raw.slice(0,4).join(', ')}
                </div>
            </div>
            </div>

    );
}

export default withSearch(({ results, wasSearched, isLoading }) => ({
    results, wasSearched, isLoading
}))(MovieInfo);