import noImage from '../img/glitch-error-404-page-background_23-2148072534.avif';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useMessage } from '../hooks/useMessage';

export default function MoviesPage() {
    const { contextHolder, showSuccess, showError } = useMessage();
    const [movie, setMovie] = useState(null);
    const [video, setVideo] = useState(null);
    const [flag, setFlag] = useState(false);
    const { id } = useParams();


    async function loadMovieData(id) {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=b507e73c6fb26fa0dcacca602b38a41e&language=en-US`);
            const data = await response.json();
            setMovie(data);
            console.log(data)
    }

    async function loadMovieVideo(id) {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=b507e73c6fb26fa0dcacca602b38a41e&language=en-US`);
        const data = await response.json();
        
    if (data.results && data.results.length > 0) {
        setVideo(data.results[0]);
    }

    }

    function AddFavorites(id) {
        let id_localStorage = LoadFavorite();
        if(id_localStorage.includes(id)) {
            showError("This movie has already been added to favorites.");
            return;
        }
        
        setFlag(!flag);
        showSuccess("Movie added to favorites!");

        id_localStorage.push(id);
        localStorage.setItem('movies_id', JSON.stringify(id_localStorage));
    }

    function LoadFavorite () {
        return JSON.parse(localStorage.getItem('movies_id')) ?? []
    }

    useEffect(() => {
        if (id) {
            loadMovieData(id);
            loadMovieVideo(id);
            const id_localStorage = LoadFavorite();
            if (id_localStorage.includes(id)) {
                setFlag(true);
            } else {
                setFlag(false);
            }
            console.log(flag)
        }
    }, [id]);

    if (!movie) {
        return <div>No movie data found.</div>;
    }

    return (
        <>
            {contextHolder}
            <div className='movie-page'>
                <div className="header">
                    <img className="poster" src={ movie.poster_path === null ? noImage : `https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                </div>
                
                <div className="movie-details">
                    <h1>Title: {movie.title}</h1>
                    <p>Overview: {movie.overview}</p>
                    <p>Genres: {movie.genres.map(genre => genre.name).join(", ")}</p>
                    <p>Для: {movie.adult === false ? "дітей та підлітків" : "дорослих"}</p>
                    <p>Budget: <span style={{color: "green"}}>{movie.budget === 0 ? "unknown" : movie.budget + "$"}</span></p>
                    <hr />
                    <p>Release date: {movie.release_date}</p>
                    <p>Vote count: {movie.vote_count}</p>
                    <p>Rating: <span style={{color: "gold"}}>⭐{movie.vote_average.toFixed(1)}</span></p>
                </div>

                <Button className={!flag ? `add-favorites` : "added-favorites" } type="primary" htmlType="submit" onClick={() => AddFavorites(movie.id)} icon={<PlusOutlined />} size="large">{flag ? "already added to favorite" : "add Favorites"}</Button>

            </div>
            <hr />
            <div className="video-container">
                <h1>Trailer: {movie.title}</h1>
                <iframe
                width="560"
                height="315"
                src={video && video.key ? `https://www.youtube.com/embed/${video.key}` : `https://www.youtube.com/embed/dQw4w9WgXcQ`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"                        
                allowFullScreen
                ></iframe>
            </div>

        </>
    );
}