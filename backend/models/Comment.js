const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  movie_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Movie'
  },
  name: String,
  email: String,
  text: String,
  date: Date
}, { collection: 'comments' }); // Usa a collection original do Atlas

module.exports = mongoose.model('Comment', commentSchema);