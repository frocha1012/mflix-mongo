const express = require('express');
const router = express.Router();
const { getMovies, getMovieById, searchMovies } = require('../controllers/movieController');


router.get('/', getMovies);
router.get('/search', searchMovies);
router.get('/:id', getMovieById);


module.exports = router;
