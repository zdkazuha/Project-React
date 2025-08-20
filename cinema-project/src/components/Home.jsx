import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import { Button, Col, Row } from 'antd';

export default function Home() {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchMovies(page);
    }, [page]);

    async function fetchMovies(page) {
        const api = `https://api.themoviedb.org/3/movie/popular?api_key=b507e73c6fb26fa0dcacca602b38a41e&language=en-US&page=${page}`;
        const response = await fetch(api);
        const data = await response.json();

        setMovies(prev => [...prev, ...data.results]);
    }

    function LoadMore() {
        setPage(prev => prev + 1);
    }

    return (
        <div className='home'>
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

            <Button className='load-more' type="primary" onClick={LoadMore}  >Load more movies</Button>


        </div>
    )
}