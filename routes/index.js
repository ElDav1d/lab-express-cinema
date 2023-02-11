const express = require("express");
const router = express.Router();
const MovieModel = require("../models/Movie.model");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index.hbs");
});

module.exports = router;

router.get("/movies", (req, res, next) => {
  MovieModel.find()
    .select({ title: 1, image: 1 })
    .then((response) => {
      res.render("movies.hbs", {
        movieList: response,
      });
    })
    .catch((error) => {
      next(error);
    });
});

// GET movie/:id => render one movie details (image, title, director, stars, description, showtime) by its id

router.get("/movie/:id", (req, res, next) => {
  const { id } = req.params;
  MovieModel.findById(id)
    .then((response) => {
      const { image, title, director, stars, description, showtimes } =
        response;

      res.render("movie.hbs", {
        movieDetails: {
          image,
          title,
          director,
          stars,
          description,
          showtimes: showtimes.join(" | "),
        },
      });
    })
    .catch((error) => {
      next(error);
    });
});
