import React, { useEffect, useState } from 'react'
import img from '../img/canvas.png'
import MovieCard from './MovieCard'
import { useMessage } from '../hooks/useMessage';

export default function Home() {
    const api = 'https://api.themoviedb.org/3/movie/popular?api_key=b507e73c6fb26fa0dcacca602b38a41e&language=en-US&page=1';

    const [movies, setMovies] = useState([]);
    const { contextHolder, showSuccess } = useMessage();

    useEffect(() => {
        fetchMovies();
    }, []);

    async function fetchMovies() {
        const response = await fetch(api);
        const data = await response.json();
        setMovies(data.results.slice(0,10));
    }

    return (
        <>
            <h1 className='weclome'>Welcome to Cinema project</h1>
            <div className="cards">
                {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
            </div>
        </>
    )
}