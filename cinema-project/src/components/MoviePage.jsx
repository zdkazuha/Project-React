import noImage from '../img/glitch-error-404-page-background_23-2148072534.avif';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { IsFavorite, LoadFavorite, UpdateLocalStorage } from '../services/Favorite.service';

export default function MoviesPage() {
    const [movie, setMovie] = useState(null);
    const [video, setVideo] = useState(null);
    const { id } = useParams();
    const [isFav, setIsFav] = useState(IsFavorite(id));

    async function loadMovieData(id) {

        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=b507e73c6fb26fa0dcacca602b38a41e&language=en-US`);
        const data = await response.json();

        setMovie(data);
    }

    async function loadMovieVideo(id) {

        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=b507e73c6fb26fa0dcacca602b38a41e&language=en-US`);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            setVideo(data.results[0]);
        }

    }

    function toggleFavorite() {

        UpdateLocalStorage(movie.id);

        setIsFav(IsFavorite(movie.id));
    }

    useEffect(() => {
        if (id) {

            loadMovieData(id);
            loadMovieVideo(id);

            setIsFav(IsFavorite(id));
        }
    }, [id]);

    if (!movie) {
        return <div>No movie data found.</div>;
    }

    return (
        <>
            <div className='movie-page'>

                <div>
                    <img className="poster" src={movie.poster_path === null ? noImage : `https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                </div>

                <div className="movie-details">
                    <h1 style={{ marginTop: -8 }} >Title: {movie.title}</h1>
                    <p>Overview: {movie.overview}</p>
                    <p>Genres: {movie.genres.map(genre => genre.name).join(", ")}</p>
                    <p>Для: {movie.adult === false ? "дітей та підлітків" : "дорослих"}</p>
                    <p>Budget: <span className='Green'>{movie.budget === 0 ? "unknown" : movie.budget + "$"}</span></p>

                    <hr />

                    <p>Release date: {movie.release_date}</p>
                    <p>Vote count: {movie.vote_count}</p>
                    <p>Rating: <span className='Gold'>⭐{movie.vote_average.toFixed(1)}</span></p>
                </div>

                <Button
                    className={isFav ? "remove-favorites" : "add-favorites"}
                    type="primary"
                    icon={<PlusOutlined />}
                    size="large"
                    onClick={toggleFavorite}
                >
                    {isFav ? "Remove from favorites" : "Add to favorites"}
                </Button>

            </div>
            <hr />
            <div className="video-container">
                <h1>Trailer: {movie.title}</h1>
                <iframe
                    width="1800"
                    height="800"
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