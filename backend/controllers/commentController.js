const mongoose = require('mongoose');
const Comment = require('../models/Comment');

exports.getComments = async (req, res) => {
  try {
    const movieObjectId = new mongoose.Types.ObjectId(req.params.movieId);
    const comments = await Comment.find({ movie_id: movieObjectId }).sort({ date: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar comentários.' });
  }
};

exports.addComment = async (req, res) => {
  const { name, email, text } = req.body;
  try {
    const newComment = new Comment({
      movie_id: req.params.movieId,
      name,
      email,
      text,
      date: new Date()
    });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao adicionar comentário.' });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const updated = await Comment.findByIdAndUpdate(
      req.params.commentId,
      { text: req.body.text },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao atualizar comentário.' });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.commentId);
    res.json({ message: 'Comentário removido.' });
  } catch (err) {
    res.status(400).json({ error: 'Erro ao remover comentário.' });
  }
};