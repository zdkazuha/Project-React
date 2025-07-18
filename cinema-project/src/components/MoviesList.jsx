import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Tag , Popconfirm } from 'antd';
import { useMessage } from '../hooks/useMessage';
import Link from 'antd/es/typography/Link';

const api = 'https://api.themoviedb.org/3/movie/popular?api_key=b507e73c6fb26fa0dcacca602b38a41e&language=en-US&page=1';
const apiGenre = 'https://api.themoviedb.org/3/genre/movie/list?api_key=b507e73c6fb26fa0dcacca602b38a41e&language=en-US';

const getColumns = (genres, DeleteMovies) => [
    {
      title: 'Poster',
      dataIndex: 'poster_path',
      key: 'poster',
      render: poster => (
        <img
          src={`https://image.tmdb.org/t/p/w200${poster}`}
          alt="Movie Poster"
          style={{ width: 75, height: 100 , padding: '0px' , margin: '0px' }}
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
            <Tag  color="blue" key={id}>
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
      render: text => <span style={{color: "gold"}}>⭐{text.toFixed(1)}</span>,
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
                <Button type="primary">Details</Button>
            </Link>
            
            <Link href={`/edit/${record.id}`}>
                <Button type="default">Edit</Button>
            </Link>

            <Popconfirm
                title="Delete the task"
                description={`Are you sure to delete ${record.title}?`}
                onConfirm={() => DeleteMovies(record.id, record.title)}
                okText="Yes"
                cancelText="No"
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
  const { contextHolder, showSuccess } = useMessage();

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
    showSuccess(`Movie with ${title} deleted successfully`);

    setMovies(movies.filter(movie => movie.id !== id));
  }

  return (
    <>
        {contextHolder}
      <h2>Movies List</h2>
      <Link href="/create">
        <Button type="primary" style={{ marginBottom: '16px' }}>Create New Movies</Button>
      </Link>
      <Table columns={getColumns(genres, DeleteMovies)} dataSource={movies} rowKey={i => i.id} />
    </>
  );
};

export default MoviesList;
