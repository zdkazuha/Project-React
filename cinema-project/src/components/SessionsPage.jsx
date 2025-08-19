import React, { useContext, useEffect, useState } from 'react';
import { Button, Space, Table, Tag, Popconfirm, Form, Select } from 'antd';
import Link from 'antd/es/typography/Link';
import { useToast } from '../contexts/toast.context';
import { genres, loadSessions } from '../services/MovieSessions';
import { UpdateSessionLocalStorage } from '../services/Favorite.service';
import { set } from 'react-hook-form';
import { AccountContext } from '../contexts/account.context';

const getColumns = (DeleteSessions, toggleFavoriteSessions, isAdmin) => [
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
        render: text => <span style={{ color: "gold" }}>⭐{text}</span>,
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
    },
    {
        title: 'Actions',
        key: 'actions',
        render: (_, record) => (
            <Space size="middle">

                <Button type="primary" onClick={() => toggleFavoriteSessions(record.id)} >Add Favorites</Button>

                <Link href={`edit_sessions/${record.id}`}>
                    <Button className={isAdmin() ? '' : 'hidden'} type="default">Edit</Button>
                </Link>

                <Popconfirm
                    title="Delete the session"
                    description={`Are you sure to delete the session for ${record.title}?`}
                    onConfirm={() => DeleteSessions(record.id)}
                    okText="Yes"
                    cancelText="No"
                    className={isAdmin() ? '' : 'hidden'}
                >
                    <Button type="primary" danger>Delete</Button>
                </Popconfirm>
            </Space>
        )
    }
];

const SessionsPage = () => {
    const [movieSessions, setMovieSessions] = useState(loadSessions());
    const [filter, setFilter] = useState();
    const [filterGenre, setFilterGenre] = useState();
    const [genre, setGenre] = useState(genres);
    const { showToast } = useToast()
    const { isAdmin } = useContext(AccountContext);

    const DeleteSessions = (id) => {
        const updatedSession = movieSessions.filter(session => session.id !== id);
        setMovieSessions(updatedSession);
        showToast('Session deleted successfully', 'success');
    }

    const toggleFavoriteSessions = (id) => {
        UpdateSessionLocalStorage(id);
        showToast('Session added to favorites successfully', 'success');
    }

    const setFilterOnChange = (value) => {
        setFilter(value);
    }

    const setGenreOnChange = (value) => {
        setFilterGenre(value);
    }

    useEffect(() => {
        if (filter) {
            const filteredSessions = loadSessions().filter(session => {
                if (!filter) return true;

                if (filter === "time") return true;
                if (filter === "date") return true;
                if (filter === "genres" && genres.includes(filterGenre)) return session.genre === filterGenre;

                return true;
            });

            if (filter === "time") {
                filteredSessions.sort((s1, s2) => new Date(`2000-01-01T${s1.time}`).getTime() - new Date(`2000-01-01T${s2.time}`).getTime());
            } else if (filter === "date") {
                filteredSessions.sort((s1, s2) => new Date(s1.date).getTime() - new Date(s2.date).getTime());
            }

            setMovieSessions(filteredSessions);
        }
    }, [filter, filterGenre]);

    return (
        <>
            <hr />
            <h1 className='header-text'>Sessions</h1>
            <hr style={{ marginBottom: 50 }} />

            <Link href={`create_sessions`}>
                <Button type="primary" style={{ marginBottom: 10}}>Create New Sessions</Button>
            </Link>

            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 1800 }}
                className='sessions-filter-form'
            >
                <Form.Item
                    label={<span style={{ fontSize: 24 }}>Filter:</span>}
                    name="filter"
                    colon={false}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 30 }}
                    rules={[{ message: 'Please select a filter type' }]}
                    className='sessions-filter-select'
                >
                    <Select
                        placeholder="Enter Type"
                        style={{ height: 40 }}
                        size="large"
                        onChange={setFilterOnChange}
                        options={[
                            { value: "time", label: "Time" },
                            { value: "date", label: "Date" },
                            { value: "genres", label: "Genres" }
                        ]}
                    />
                </Form.Item>

                <Form.Item
                    label={<span style={{ fontSize: 24 }}>Genres:</span>}
                    name="genres"
                    colon={false}
                    labelCol={{ span: 90 }}
                    wrapperCol={{ span: 30 }}
                    className={filter === "genres" ? `sessions-genre-select` : `sessions-genre-select hidden`}
                >
                    <Select
                        placeholder="Select Genre"
                        style={{ height: 40 }}
                        size="large"
                        options={genre.map(g => ({ label: g, value: g }))}
                        onChange={setGenreOnChange}
                    />
                </Form.Item>

                <Popconfirm
                    title="Delete filter"
                    description="Are you sure to clear the filter?"
                    onConfirm={() => {
                        setFilter(null);
                        setFilterGenre(null);
                        setMovieSessions(loadSessions());
                        showToast('Filter cleared successfully', 'success');
                    }}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button style={{ width: 160, marginBottom: 20  }} type='primary' danger>Clear Filter</Button>
                </Popconfirm>
            </Form>

            <Table columns={getColumns(DeleteSessions, toggleFavoriteSessions, isAdmin)} dataSource={movieSessions} rowKey={i => i.id} />
        </>
    );
};

export default SessionsPage;
