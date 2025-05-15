import React, { useEffect, useState } from 'react';
import { getMovies, searchMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import Highlighter from 'react-highlight-words';
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [searchMode, setSearchMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const res = await getMovies();
      setMovies(res.data.data);
    } catch (err) {
      console.error('Erro ao buscar filmes:', err);
    }
    setLoading(false);
  };

  const handleSearch = async () => {
    if (query.trim() === '') {
      setSearchMode(false);
      fetchMovies();
      return;
    }

    setLoading(true);
    try {
      const res = await searchMovies(query);
      setMovies(res.data);
      setSearchMode(true);
    } catch (err) {
      console.error('Erro na pesquisa:', err);
    }
    setLoading(false);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Lista de Filmes
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <TextField
          fullWidth
          label="Pesquisar por título ou descrição"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button variant="contained" onClick={handleSearch}>
          Pesquisar
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {movies.map((movie) => (
            <Grid item xs={12} sm={6} md={3} key={movie._id}>
              <MovieCard movie={movie} searchTerm={searchMode ? query : ''} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default MovieList;
