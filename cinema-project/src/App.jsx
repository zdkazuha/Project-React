import { useState } from 'react'
import Layout from './components/Layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import MoviesList from './components/MoviesList'
import NoPage from './components/NoPage' 
import './App.css'
import MoviesForm from './components/MoviesForm'
import MoviesPage from './components/MoviePage'

function App() {


  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<MoviesList />} />
          <Route path="create" element={<MoviesForm />} />
          <Route path="movies_page" element={<MoviesPage />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
