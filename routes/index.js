const express = require("express");
const router = express.Router();
const MovieModel = require("../models/Movie.model");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index.hbs");
});

module.exports = router;

router.get("/movies", async (req, res, next) => {
  try {
    const movieList = await MovieModel.find().select({ title: 1, image: 1 });

    res.render("movies.hbs", {
      movieList,
    });
  } catch (error) {
    next(error);
  }
});

// GET movie/:id => render one movie details (image, title, director, stars, description, showtime) by its id

router.get("/movie/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const { image, title, director, stars, description, showtimes } =
      await MovieModel.findById(id);

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
  } catch (error) {
    next(error);
  }
});
