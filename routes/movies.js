const { Movie, validate } = require("../models/movie");
const { Genre } = require("../models/genre");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("title");
  res.send(movies);
});
router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) res.status(404).send("the movie with given id not found");
  res.send(movie);
});
router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);
  try {
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send("invalid genre");

    let movie = new Movie({
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    });
    movie = await movie.save();
    res.send(movie);
  } catch (err) {
    console.log("err", err);
  }
});
router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send("invalid genre");
    const movie = await Movie.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
      new: true,
    });
    if (!movie)
      return res.status(404).send("the movie with given id not found");
    res.send(movie);
  } catch (err) {
    console.log("err", err);
  }
});
router.delete("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);
  if (!movie) res.status(404).send("the movie with given id not found");

  res.send(movie);
});

module.exports = router;
