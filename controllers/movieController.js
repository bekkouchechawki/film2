import movieModel from '../models/movieModel.js';

export const getAllMovies = (req, res) => {
  movieModel.getAllMovies((err, results) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(200).json(results);
    }
  });
};

export const getMovieById = (req, res) => {
  const { id } = req.params;
  movieModel.getMovieById(id, (err, results) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else if (results.length) {
      res.status(200).json(results[0]);
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  });
};

export const createMovie = (req, res) => {
  const newMovie = req.body;
  movieModel.createMovie(newMovie, (err, results) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(201).json({ id: results.insertId, ...newMovie });
    }
  });
};

export const updateMovie = (req, res) => {
  const { id } = req.params;
  const movieData = req.body;
  movieModel.updateMovie(id, movieData, (err, results) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(200).json({ id, ...movieData });
    }
  });
};

export const deleteMovie = (req, res) => {
  const { id } = req.params;
  movieModel.deleteMovie(id, (err, results) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(200).json({ message: 'Movie successfully deleted' });
    }
  });
};
