const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const movieRoutes = require('./routes/movieRoutes');
const commentRoutes = require('./routes/commentRoutes');
const cors = require('cors');

require('dotenv').config();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/movies', movieRoutes);
app.use('/api/comments', commentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor iniciado na porta ${PORT}`));