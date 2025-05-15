const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: Number },
  poster: { type: String },
  plot: { type: String },
  genres: { type: [String] },
  imdb: {
    rating: Number,
    votes: Number,
    id: Number,
  },
  fullplot: { type: String },
});

module.exports = mongoose.model('Movie', MovieSchema, 'movies');
