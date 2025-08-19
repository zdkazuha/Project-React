import React, { useContext, useEffect, useState } from 'react';
import { Button, Space, Table, Tag, Popconfirm } from 'antd';
import Link from 'antd/es/typography/Link';
import { useToast } from '../contexts/toast.context';
import { AccountContext } from '../contexts/account.context';

const api = 'https://api.themoviedb.org/3/movie/popular?api_key=b507e73c6fb26fa0dcacca602b38a41e&language=en-US&page=1';
const apiGenre = 'https://api.themoviedb.org/3/genre/movie/list?api_key=b507e73c6fb26fa0dcacca602b38a41e&language=en-US';

const getColumns = (genres, DeleteMovies, isAdmin) => [
  {
    title: 'Poster',
    dataIndex: 'poster_path',
    key: 'poster',
    render: poster => (
      <img
        src={`https://image.tmdb.org/t/p/w200${poster}`}
        alt="Movie Poster"
        style={{ width: 75, height: 100, padding: '0px', margin: '0px' }}
      />
    ),
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Genre',
    dataIndex: 'genre_ids',
    key: 'genre',
    render: ids => (
      <>
        {ids.map(id => (
          <Tag color="blue" key={id}>
            {genres[id] || 'Unknown'}
          </Tag>
        ))}
      </>
    ),
  },
  {
    title: 'Rating',
    dataIndex: 'vote_average',
    key: 'rating',
    render: text => <span style={{ color: "gold" }}>⭐{text.toFixed(1)}</span>,
  },
  {
    title: 'Release date',
    dataIndex: 'release_date',
    key: 'year',
    render: text => <span>{text}</span>,
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (_, record) => (
      <Space size="middle">
        <Link href={`movie_page/${record.id}`}>
          <Button style={{ width: 100 }} type="primary">Details</Button>
        </Link>

        <Link href={`/edit/${record.id}`}>
          <Button
            className={isAdmin() ? '' : 'hidden'}
            type="default">Edit</Button>
        </Link>

        <Popconfirm
          title="Delete the task"
          description={`Are you sure to delete ${record.title}?`}
          onConfirm={() => DeleteMovies(record.id, record.title)}
          okText="Yes"
          cancelText="No"
          className={isAdmin() ? '' : 'hidden'}
        >
          <Button type="primary" danger>Delete</Button>
        </Popconfirm>
      </ Space>
    )
  },
];

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState({});
  const { showToast } = useToast()

  const { isAdmin } = useContext(AccountContext);


  useEffect(() => {
    fetchMoviesGenre();
    fetchMovies();
  }, []);

  async function fetchMovies() {
    const response = await fetch(api);
    const data = await response.json();
    setMovies(data.results);
    console.log(data.results);
  }

  async function fetchMoviesGenre() {
    const response = await fetch(apiGenre);
    const data = await response.json();

    const genreMap = {};
    data.genres.forEach(genre => {
      genreMap[genre.id] = genre.name;
    });

    setGenres(genreMap);
  }

  function DeleteMovies(id, title) {
    showToast(`Movie with ${title} deleted successfully`, "success");

    setMovies(movies.filter(movie => movie.id !== id));
  }

  return (
    <>
      <hr />
      <h1 className='header-text'>Movies</h1>
      <hr style={{ marginBottom: 50 }} />

      <Link href="/create">
        <Button type="primary" style={{ marginBottom: '16px' }}>Create New Movies</Button>
      </Link>

      <Table columns={getColumns(genres, DeleteMovies, isAdmin)} dataSource={movies} rowKey={i => i.id} />
    </>
  );
};

export default MoviesList;
