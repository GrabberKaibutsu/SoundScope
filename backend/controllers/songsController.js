const express = require("express");
const router = express.Router();
const Songs = require("../models/songsList");
const db = require("../models");
require('dotenv').config();

const spotifyAPIBaseURL = "https://api.spotify.com/v1";

// Dynamic import of fetch to handle ES Modules
async function fetch(url, options) {
  const { default: fetch } = await import("node-fetch");
  return fetch(url, options);
}

// Function to get Spotify access token
async function getSpotifyAccessToken() {
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const tokenUrl = "https://accounts.spotify.com/api/token";
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(`Spotify token request failed: ${data.error_description}`);
  }
  return data.access_token;
}

// Fetch new releases (trending songs)
async function fetchNewReleases() {
  const token = await getSpotifyAccessToken();
  const url = `${spotifyAPIBaseURL}/browse/new-releases?market=US&limit=20`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`Spotify API request failed: ${response.statusText}`);
  }
  return await response.json();
}

// Fetch single song details
async function fetchSongDetails(songId) {
  const token = await getSpotifyAccessToken();
  const url = `${spotifyAPIBaseURL}/tracks/${songId}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`Spotify API request failed: ${response.statusText}`);
  }
  return await response.json();
}

// Routes
router.get("/trending", async (req, res) => {
  try {
    const newReleases = await fetchNewReleases();
    res.json(newReleases.albums.items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const songDetails = await fetchSongDetails(req.params.id);
    res.json(songDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;



