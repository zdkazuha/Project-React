import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import { Col, Row } from 'antd';

export default function Home() {
    const api = 'https://api.themoviedb.org/3/movie/popular?api_key=b507e73c6fb26fa0dcacca602b38a41e&language=en-US&page=1';

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchMovies();
    }, []);

    async function fetchMovies() {

        const response = await fetch(api);
        const data = await response.json();

        setMovies(data.results);
    }

    return (
        <>
            <hr />
            <h1 className='header-text'>Welcome to Cinema project</h1>
            <hr style={{ marginBottom: 50 }} />

            <div className="cards">
                <Row gutter={[54.5, 60]}>
                    {movies.map(movie => (
                        <Col key={movie.id} span={4}>
                            <MovieCard movie={movie} />
                        </Col>
                    ))}
                </Row>
            </div>
        </>
    )
}