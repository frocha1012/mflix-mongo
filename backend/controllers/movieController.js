const Movie = require('../models/Movie');

// GET /api/movies?page=1&limit=8
exports.getMovies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * limit;

    const movies = await Movie.find()
      .select('title year poster genres')
      .skip(skip)
      .limit(limit)
      .sort({ year: -1 });

    const count = await Movie.countDocuments();

    res.json({
      data: movies,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalMovies: count,
    });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar filmes.' });
  }
};

// GET /api/movies/:id
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Filme não encontrado.' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar o filme.' });
  }
};

exports.searchMovies = async (req, res) => {
  const { q } = req.query;

  try {
    console.log("🔍 Query received:", q); // DEBUG
    const results = await Movie.find({
      $text: { $search: q }
    }).select('title year poster genres');

    res.json(results);
  } catch (err) {
    console.error("❌ Erro ao buscar filme (full error):", err); // IMPORTANT
    res.status(500).json({ message: 'Erro ao buscar o filme.' });
  }
};




