const express = require("express");
const router = express.Router();

// Example route
router.get("/", (req, res) => {
  res.send("Welcome to the Music API!");
});

//Route for Single Songs
const Song = require('../models/songsList');


// Fetch a single song
router.get('/songs/:id', async (req, res) => {
    try {
        const song = await Song.findById(req.params.id)
                               .populate('artist album genre postedBy');
        if (!song) {
            res.status(404).send('Song not found');
        } else {
            res.json(song);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});




//Route for Song List
// Fetch all songs
router.get('/songs', async (req, res) => {
    console.log("Fetching all songs");
    try {
        const songs = await Song.find()
                                .populate('artist album genre')
                                .sort({ releaseDate: -1 }); // Sorting by release date as an example
        res.json(songs);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


module.exports = router;






//Route for Song List
// Fetch all songs
router.get('/songs', async (req, res) => {
    console.log("Fetching all songs");
    try {
        const songs = await Song.find()
                                .populate('artist album genre')
                                .sort({ releaseDate: -1 }); // Sorting by release date as an example
        res.json(songs);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


module.exports = router;

