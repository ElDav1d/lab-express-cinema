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
