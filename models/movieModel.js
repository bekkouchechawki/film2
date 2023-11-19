import db from '../config/db.js';

const movieModel = {
  getAllMovies: (callback) => {
    db.query('SELECT * FROM movies', callback);
  },

  getMovieById: (id, callback) => {
    db.query('SELECT * FROM movies WHERE id = ?', [id], callback);
  },

  createMovie: (newMovie, callback) => {
    db.query('INSERT INTO movies SET ?', newMovie, callback);
  },

  updateMovie: (id, movieData, callback) => {
    db.query('UPDATE movies SET ? WHERE id = ?', [movieData, id], callback);
  },

  deleteMovie: (id, callback) => {
    db.query('DELETE FROM movies WHERE id = ?', [id], callback);
  }
};

export default movieModel;
