import React, { useContext, useEffect, useState } from 'react';
import { Button, Space, Table, Tag, Popconfirm, Form, Select } from 'antd';
import Link from 'antd/es/typography/Link';
import { useToast } from '../contexts/toast.context';
import { genres, loadSessions } from '../services/MovieSessions';
import { IsBookATicket, IsFavoriteSession, loadTickets, saveTickets, UpdateSessionLocalStorage, UpdateTicket } from '../services/Favorite.service';
import { set } from 'react-hook-form';
import { AccountContext } from '../contexts/account.context';

const SessionsPage = () => {
    const [movieSessions, setMovieSessions] = useState(loadSessions());
    const [filter, setFilter] = useState();
    const [filterGenre, setFilterGenre] = useState();
    const [genre, setGenre] = useState(genres);
    const { showToast } = useToast()
    const { isAdmin, isAuth, email } = useContext(AccountContext);
    const [favoriteSessions, setFavoriteSessions] = useState([]);
    const [reserveTicket, setReserveTicket] = useState([]);

    const DeleteSessions = (id) => {
        const updatedSession = movieSessions.filter(session => session.id !== id);
        setMovieSessions(updatedSession);
        showToast('Session deleted successfully', 'success');
    }

    const toggleFavoriteSessions = (id) => {
        UpdateSessionLocalStorage(id, isAuth, email);

        setFavoriteSessions(prev =>
            prev.includes(id)
                ? prev.filter(favId => favId !== id)
                : [...prev, id]
        );

        showToast('Session favorite status updated', 'success');
    }

    const toggleReserveTicket = (id) => {
        const tickets = loadTickets();
        const ticketInfo = tickets.find(t => t.id === id);

        if (!ticketInfo || ticketInfo.ticketsAvailable === 0) {
            showToast('Sorry, tickets are sold out!', 'error');
            return;
        }

        UpdateTicket(id, isAuth, email);

        setReserveTicket(prev => {
            let updated;
            let updatedTickets = tickets.map(t => {
                if (t.id === id) {
                    const newCount = prev.includes(id) ? t.ticketsAvailable + 1 : t.ticketsAvailable - 1;
                    return { ...t, ticketsAvailable: newCount };
                }
                return t;
            });

            updated = prev.includes(id)
                ? prev.filter(favId => favId !== id)
                : [...prev, id];

            saveTickets(updatedTickets);

            setMovieSessions(sessions =>
                sessions.map(s => {
                    const t = updatedTickets.find(ticket => ticket.id === s.id);
                    return t ? { ...s, ticketsAvailable: t.ticketsAvailable } : s;
                })
            );

            return updated;
        });

        showToast('Ticket status updated', 'success');
    };

    const setFilterOnChange = (value) => {
        setFilter(value);
    }

    const setGenreOnChange = (value) => {
        setFilterGenre(value);
    }

    useEffect(() => {
        if (filter) {
            const filteredSessions = loadSessions(isAuth, email).filter(session => {
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

    useEffect(() => {
        const favs = [];
        const tickets = [];

        movieSessions.forEach(session => {
            if (IsFavoriteSession(session.id, isAuth, email)) favs.push(session.id);
            if (IsBookATicket(session.id, isAuth, email)) tickets.push(session.id);
        });

        setFavoriteSessions(favs);
        setReserveTicket(tickets);
    }, [movieSessions]);


    useEffect(() => {
        const ticketsFromStorage = loadTickets();
        if (ticketsFromStorage.length === 0) {
            const initialTickets = movieSessions.map(s => ({ id: s.id, ticketsAvailable: s.ticketsAvailable }));
            saveTickets(initialTickets);
        } else {
            setMovieSessions(prev => prev.map(s => {
                const t = ticketsFromStorage.find(ticket => ticket.id === s.id);
                return t ? { ...s, ticketsAvailable: t.ticketsAvailable } : s;
            }));
        }
    }, []);



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
            title: 'Ticket',
            dataIndex: 'ticketsAvailable',
            key: 'ticketsAvailable',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">

                    <Button type="primary" className={favoriteSessions.includes(record.id) ? "remove-favorites-sessions" : "add-favorites-sessions"} onClick={() => toggleFavoriteSessions(record.id)} >{favoriteSessions.includes(record.id) ? "Remove from favorites" : "Add to favorites"}</Button>

                    <Button type="primary" className={record.ticketsAvailable === 0 ? "remove-favorites-sessions" : reserveTicket.includes(record.id) ? "cancel-reservation" : "book-a-ticket"} onClick={() => toggleReserveTicket(record.id)} >{record.ticketsAvailable === 0 ? "Sold out" : reserveTicket.includes(record.id) ? "Remove from reserve ticket" : "Add to reserve ticket"}</Button>


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

    return (
        <>
            <hr />
            <h1 className='header-text'>Sessions</h1>
            <hr style={{ marginBottom: 50 }} />

            <Link href={`create_sessions`}>
                <Button type="primary" style={{ marginBottom: 10 }}>Create New Sessions</Button>
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
                    <Button style={{ width: 160, marginBottom: 20 }} type='primary' danger>Clear Filter</Button>
                </Popconfirm>
            </Form>

            <Table columns={getColumns()} dataSource={movieSessions} rowKey={i => i.id} />
        </>
    );
};

export default SessionsPage;
