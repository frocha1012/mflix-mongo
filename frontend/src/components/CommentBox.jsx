// src/components/CommentBox.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, List, ListItem, IconButton, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const CommentBox = ({ movieId }) => {
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', text: '' });
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  const fetchComments = () => {
    axios.get(`http://localhost:5000/api/comments/${movieId}`)
      .then(res => setComments(res.data))
      .catch(err => console.error('Erro ao carregar comentários', err));
  };

  useEffect(() => {
    fetchComments();
  }, [movieId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:5000/api/comments/${movieId}`, form)
      .then(() => {
        fetchComments();
        setForm({ name: '', email: '', text: '' });
      })
      .catch(err => console.error('Erro ao adicionar comentário', err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/comments/delete/${id}`)
      .then(fetchComments)
      .catch(err => console.error('Erro ao apagar comentário', err));
  };

  const handleEdit = (id, currentText) => {
    setEditId(id);
    setEditText(currentText);
  };

  const handleSave = (id) => {
    axios.put(`http://localhost:5000/api/comments/edit/${id}`, { text: editText })
      .then(() => {
        setEditId(null);
        fetchComments();
      })
      .catch(err => console.error('Erro ao editar comentário', err));
  };

  return (
    <Paper sx={{ mt: 6, p: 3 }} elevation={4}>
      <Typography variant="h5" gutterBottom>Comentários</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
        <TextField
          label="Nome"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Comentário"
          value={form.text}
          onChange={(e) => setForm({ ...form, text: e.target.value })}
          required
          multiline
          fullWidth
          rows={3}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained">Comentar</Button>
      </Box>

      <List>
        {comments.map((c) => (
          <Paper key={c._id} elevation={3} sx={{ p: 2, mb: 2, border: '1px solid #ccc' }}>
            <Typography variant="subtitle2">{c.name}</Typography>
            {editId === c._id ? (
              <Box>
                <TextField
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  fullWidth
                  multiline
                  rows={2}
                />
                <Button
                  onClick={() => handleSave(c._id)}
                  startIcon={<SaveIcon />} sx={{ mt: 1 }}>
                  Guardar
                </Button>
              </Box>
            ) : (
              <Box sx={{ whiteSpace: 'pre-wrap' }}>
                <Typography variant="body2">{c.text}</Typography>
                <IconButton onClick={() => handleEdit(c._id, c.text)}><EditIcon /></IconButton>
                <IconButton onClick={() => handleDelete(c._id)}><DeleteIcon /></IconButton>
              </Box>
            )}
          </Paper>
        ))}
      </List>
    </Paper>
  );
};

export default CommentBox;
