const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const Artist = require("../models/artist");

// Require DB connection
const db = require("../models");

const spotifyAPIBaseURL = "https://api.spotify.com/v1";
const token = "Your_Spotify_Access_Token";

let authParameters = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
}

fetch('https://accounts.spotify.com/api/token', authParameters)
.then(result => result.json())
.then(data=> 
  // console.log(data)
  token = data.access_token
)

// Function to fetch artist data from Spotify API
async function fetchArtistsFromSpotify() {
  // Define the endpoint URL
  const endpoint = `${spotifyAPIBaseURL}/search?q=year%3A2024&type=artist&limit=20`;
  try {
    // Fetch data from Spotify API
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // If the response is not OK, throw an error
    if (!response.ok) {
      throw new Error(`Spotify API request failed: ${response.statusText}`);
    }

    // Parse the response body as JSON
    const data = await response.json();
    // Return the artists array
    return data.artists.items;
  } catch (error) {
    // Log error and throw it up the chain
    console.error("Error fetching artists from Spotify:", error);
    throw error;
  }
}

// Index - GET - /artists
router.get("/artists", async (req, res) => {
  try {
    // Fetch artists from Spotify
    const artists = await fetchArtistsFromSpotify();
    // Send the response
    res.json(artists);
  } catch (error) {
    // Handle error
    res.status(500).json({ error: "Failed to fetch artists from Spotify" });
  }
});

// Create - POST - /artists

// Show - GET - /artists/:id

// Update - PUT - /artists/:id

// Delete - DELETE - /artists/:id

module.exports = router;