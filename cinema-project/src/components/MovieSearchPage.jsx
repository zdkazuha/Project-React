import React, { useEffect, useState } from 'react';
import {
    Form,
    Input,
    Select,
} from 'antd';
import { useMessage } from '../hooks/useMessage';
import MovieCard from './MovieCard';
import { set } from 'react-hook-form';


const MovieSearch = () => {
    const apiGenre = 'https://api.themoviedb.org/3/genre/movie/list?api_key=b507e73c6fb26fa0dcacca602b38a41e&language=en-US';
    const { contextHolder, showSuccess } = useMessage();
    const [filterType, setFilterType] = useState(null);
    const [filter, setFilter] = useState(null);
    const [genres, setGenres] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [years, setYears] = useState([]);
    const [movies, setMovies] = useState([]);
    let arr = [];


    useEffect(() => {
        fetchMoviesGenre();

        const rating = Array.from({ length: 19 }, (_, i) => {
        const val = 1 + i * 0.5;
        return { value: val, label: val.toString() };
        });
        setRatings(rating)

        const year = Array.from({ length: 2025 - 2000 + 1 }, (_, i) => 2000 + i)
        .map(y => ({ value: y, label: y.toString() }));
        setYears(year);

    }, []);
    
    const filterTypes = [
        { value: 'genre', label: 'Жанр' },
        { value: 'rating', label: 'Рейтинг' },
        { value: 'year', label: 'Рік' },
    ];
    
    async function fetchMoviesGenre() {
        const response = await fetch(apiGenre);
        const data = await response.json();

        const genresMap = data.genres.map(genre => ({
            value: genre.id,
            label: genre.name,
        }));

        setGenres(genresMap);
    }

    function fetchMoviesSearch(query) {
        console.log(query)
        const api = `https://api.themoviedb.org/3/search/movie?api_key=b507e73c6fb26fa0dcacca602b38a41e&query=${query}&language=en-US`;
        fetch(api)
            .then(response => response.json())
            .then(data => setMovies(audit(...data.results)))
            .catch(error => {
                console.error('Error fetching movies:', error);
            });
    }

    function audit(...movies) {
        console.log(movies)
        if (filterType === 'genre') {
            return movies.filter(movie => movie.genre_ids.includes(filter));
        } else if (filterType === 'rating') {
            return movies.filter(movie => movie.vote_average.toFixed(1) >= filter);
        } else if (filterType === 'year') {
            return movies.filter(movie => new Date(movie.release_date).getFullYear() === filter);
        }
        return movies;
    }

    const setFilterTypeOnChange = (type) => {
        setFilterType(type)
    }

    const setFilterOnChange = (type) => {
        setFilter(type)
        console.log(type)
    }

    const SearchMovie = (type) => {
        showSuccess(`Start Searching movie name ${type.target.value}`)
        type.preventDefault();
        fetchMoviesSearch(type.target.value)
    }

    return (
        <>
            {contextHolder}
            <h2>{""}</h2>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 1800 }}
                className='movie-search-form'
            >

                <Form.Item
                    name="search-movie"
                    label={<span style={{ fontSize: 24 }}>Search Movie:</span>}
                    colon={false}
                    rules={[
                        { message: 'Please enter a movie title' },
                        { min: 3, message: 'Minimum 3 characters required' }
                    ]}
                    labelCol={{ style: { fontSize: 24 } }}
                >
                    <Input style={{ width: 1300, height: 40, fontSize: 20 }} placeholder="Enter" onPressEnter={SearchMovie} />
                </Form.Item>

                <Form.Item
                    label={<span style={{ fontSize: 24 }}>Type:</span>}
                    name="filter_type"
                    colon={false}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 30 }}
                    rules={[{ message: 'Please select a filter type' }]}
                    style={{ position: 'absolute', left: 1520, top: 160, height: 40, width: 300, fontSize: 24 }}
                >
                    <Select
                        placeholder="Enter Type"
                        style={{ height: 40 }}
                        size="large"
                        onChange={setFilterTypeOnChange}
                        options={filterTypes}
                    />
                </Form.Item>

                <Form.Item
                    label={<span style={{ fontSize: 24 }}>{filterType === 'genre' ? "Genre" : filterType === 'rating' ? "Rating" : "Year"}:</span>}
                    name="filter"
                    colon={false}
                    labelCol={{ span: 90 }}
                    wrapperCol={{ span: 30 }}
                    style={{ position: 'absolute', left: 1520, top: 210, height: 40, width: 300, fontSize: 24 }}
                >
                    <Select
                        placeholder={filterType === 'genre' ? "Enter Genre" : filterType === 'rating' ? "Enter Rating" : filterType ?? "Enter Year"}
                        style={{ height: 40 }}
                        size="large"
                        options={filterType === 'genre' ? genres : filterType === 'rating' ? ratings : filterType === null ? "No" : years}
                        onChange={setFilterOnChange}
                    />
                </Form.Item>
            </Form>

            <hr  />
            <div className="movies-list">
            {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
            </div>

        </>
    );
};

export default MovieSearch;
