import { use, useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { useToast } from "../contexts/toast.context";

export default function FavoritePage () {

    const [movies, setMovies] = useState([]);
    const {showToast} = useToast()

    useEffect(() => {
        const storedMovies = JSON.parse(localStorage.getItem('movies_id')) ?? [];
        if (storedMovies.length > 0) {
            showToast("Your favorite movies loaded successfully!", "success");

            Promise.all(
                storedMovies.map(id =>
                    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=b507e73c6fb26fa0dcacca602b38a41e&language=en-US`)
                    .then(res => res.json())
                )
                ).then(moviesData => {
                setMovies(moviesData);
                });
        }
    }, []);

    return (
        <>
            <h1 id="favorite-movie">Your Favotites Movies</h1>
            <div>
                <div className="cards">
                    {movies.length > 0 ? movies.map(movie => <MovieCard key={movie.id} movie={movie} />) : <p style={{fontSize: 36, }}>Add your favorite movies here.</p>}
                </div>
            </div>
        </>
    );
}
