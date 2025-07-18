import { use, useEffect, useState } from "react";
import { useMessage } from "../hooks/useMessage";

export default function FavoritePage () {

    const [movies, setMovies] = useState([]);
    const { contextHolder, showSuccess } = useMessage();

    useEffect(() => {
        const storedMovies = JSON.parse(localStorage.getItem('key')) || [];
        if (storedMovies.length > 0) {
            showSuccess("Your favorite movies loaded successfullyq!");
            alert(storedMovies);
        }
    }, []);

    async function loadMovieData(id) {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=b507e73c6fb26fa0dcacca602b38a41e&language=en-US`);
        const data = await response.json();
        setMovie(data);
        console.log(data)
    }

    return (
        <>
            <h1>Your Favotites Movies</h1>
            <div>

            </div>
        </>
    );
}
