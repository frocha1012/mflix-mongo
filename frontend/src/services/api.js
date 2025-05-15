import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Altera para a URL de produção no deploy
});

export const getMovies = (page = 1, limit = 8) =>
  API.get(`/movies?page=${page}&limit=${limit}`);

export const getMovieById = (id) =>
  API.get(`/movies/${id}`);

export const searchMovies = (query) =>
  API.get(`/movies/search?q=${encodeURIComponent(query)}`);
