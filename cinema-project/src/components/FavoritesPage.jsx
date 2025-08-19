import { useContext, useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { LoadFavorite, LoadFavoriteSession } from "../services/Favorite.service";
import { loadSessions } from "../services/MovieSessions";
import { Col, Row, Table } from "antd";
import { AccountContext } from "../contexts/account.context";

const getColumns = () => [
    {
        title: 'MovieTitle',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Genre',
        dataIndex: 'genre',
        key: 'genre',
    },
    {
        title: 'Duration',
        dataIndex: 'durationMinutes',
        key: 'durationMinutes',
    },
    {
        title: 'Rating',
        dataIndex: 'rating',
        key: 'rating',
        render: text => <span className="Gold" >⭐{text}</span>,
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Time',
        dataIndex: 'time',
        key: 'time',
    },
    {
        title: 'Hall',
        dataIndex: 'hall',
        key: 'hall',
    },
    {
        title: 'Age Rating',
        dataIndex: 'ageRestriction',
        key: 'ageRestriction',
    },
    {
        title: 'Price',
        dataIndex: 'ticketPrice',
        key: 'ticketPrice',
    }
];

export default function FavoritePage() {

    const [movieSessions, setMovieSessions] = useState([]);
    const [movies, setMovies] = useState([]);
    const { isAuth, email } = useContext(AccountContext);
    const api = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const storedMovies = LoadFavorite(isAuth, email);
        if (storedMovies.length > 0) {

            Promise.all(
                storedMovies.map(id =>
                    fetch(`${api}/movie/${id}?api_key=b507e73c6fb26fa0dcacca602b38a41e&language=en-US`)
                        .then(res => res.json())
                )
            ).then(moviesData => {
                setMovies(moviesData);
            });
        }

        const sessionsFavorite = LoadFavoriteSession(isAuth, email);
        if (sessionsFavorite.length > 0) {

            const sessionsLoad = loadSessions()
            const favoriteSessions = sessionsLoad.filter(session => sessionsFavorite.includes(session.id));

            setMovieSessions(favoriteSessions);
        }
    }, []);

    return (
        <>
            <hr />
            <h1 className="header-text">Your Favotites Movie</h1>
            <hr style={{ marginBottom: 50 }} />

            <div>
                <div>
                    {
                        movies.length > 0 ?
                            <Row gutter={[54.5, 60]}>
                                {movies.map(movie => (
                                    <Col key={movie.id} span={4}>
                                        <MovieCard movie={movie} />
                                    </Col>
                                ))}
                            </Row>
                            : <p style={{ fontSize: 36, textAlign: 'center' }}>Add your favorite movies here.</p>
                    }
                </div>
            </div>

            <hr style={{ marginTop: 50 }} />
            <h1 className="header-text">Your Favotites Sessions</h1>
            <hr style={{ marginBottom: 50 }} />

            <div>
                <Table columns={getColumns()} dataSource={movieSessions} rowKey={i => i.id} />
            </div>
        </>
    );
}
