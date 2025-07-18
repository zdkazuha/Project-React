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
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
