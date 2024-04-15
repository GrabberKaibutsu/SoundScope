const fetch = require("node-fetch");
const mongoose = require("mongoose");
const Artist = require("../models/artist");
const Album = require("../models/album");

mongoose.connect("mongodb://localhost:27017/spotifyDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function fetchArtist() {
  try {
    const response = await fetch(
      "https://api.spotify.com/v1/artists/0OdUWJ0sBjDrqHygGUXeCF",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer [your access token]",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await response.json();
    for (const item of data) {
      const artist = new Artist({
        name: item.name,
        genres: item.genres.join(", "),
        followers: item.followers.total,
        type: item.type,
      });
      await artist.save();
    }
  } catch (error) {
    console.log(error);
  }
}

async function fetchAlbum() {
  try {
    const response = await fetch(
      "https://api.spotify.com/v1/albums/6akEvsycLGftJxYudPjmqK",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer [your access token]",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await response.json();
    for (const item of data) {
      const album = new Album({
        totalTracks: item.total_tracks,
        name: item.name,
        releaseDate: item.release_date,
        type: item.type,
      });
      await album.save();
    }
  } catch (error) {
    console.log(error);
  }
}