import { use, useEffect, useState } from "react";
import { useMessage } from "../hooks/useMessage";
import MovieCard from "./MovieCard";

export default function FavoritePage () {

    const [movies, setMovies] = useState([]);
    const { contextHolder, showSuccess } = useMessage();

    useEffect(() => {
        const storedMovies = JSON.parse(localStorage.getItem('movies_id')) ?? [];
        if (storedMovies.length > 0) {
            showSuccess("Your favorite movies loaded successfully!");

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
            {contextHolder}
            <h1 id="favorite-movie">Your Favotites Movies</h1>
            <div>
                <div className="cards">
                    {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
                </div>
            </div>
        </>
    );
}
