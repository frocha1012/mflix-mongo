// MovieDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieById } from '../services/api';
import CommentBox from '../components/CommentBox';
import {
  Container,
  Typography,
  Box,
  Chip,
  Grid,
  CircularProgress,
} from '@mui/material';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMovieById(id)
      .then((res) => {
        setMovie(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erro ao buscar detalhes:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!movie) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6">Filme não encontrado.</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={4} alignItems="flex-start">
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src={movie.poster || 'https://via.placeholder.com/300x450'}
              alt={movie.title}
              style={{ maxWidth: 300, width: '100%', borderRadius: 8 }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            {movie.title}
          </Typography>

          <Typography variant="body1" sx={{ mb: 2 }}>
            {movie.fullplot || movie.plot || 'Sem descrição disponível.'}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {movie.genres?.map((genre, i) => (
              <Chip key={i} label={genre} />
            ))}
          </Box>
        </Grid>
      </Grid>

      {/* Comentários */}
      <CommentBox movieId={id} />
    </Container>
  );
};

export default MovieDetail;
