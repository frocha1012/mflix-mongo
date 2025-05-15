import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MovieList from './pages/MovieList';
import MovieDetail from './pages/MovieDetail';

const App = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<MovieList />} />
      <Route path="/movies/:id" element={<MovieDetail />} />
    </Routes>
  </>
);

export default App;
