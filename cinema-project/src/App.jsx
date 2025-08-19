import { useState } from 'react'
import Layout from './components/Layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import MoviesList from './components/MoviesList'
import MoviesForm from './components/MoviesForm'
import MoviesPage from './components/MoviePage'
import FavoritePage from './components/FavoritesPage'
import MovieSearchPage from './components/MovieSearchPage'
import NoPage from './components/NoPage'
import './App.css'
import LoginForm from './components/LoginForm'
import LogoutPage from './components/LogoutPage'
import SessionsPage from './components/SessionsPage'
import SessionsForm from './components/SessionsForm'
import RegisterPage from './components/RegisterPage'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="movies" element={<MoviesList />} />
            <Route path="create" element={<MoviesForm />} />
            <Route path="edit/:id" element={<MoviesForm />} />
            <Route path="movie_page/:id" element={<MoviesPage />} />
            <Route path="favorite_page" element={<FavoritePage />} />
            <Route path="search_page" element={<MovieSearchPage />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="logout" element={<LogoutPage />} />
            <Route path="sessions_page" element={<SessionsPage />} />
            <Route path="create_sessions" element={<SessionsForm />} />
            <Route path="edit_sessions/:id" element={<SessionsForm />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
