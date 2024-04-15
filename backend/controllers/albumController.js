// Require modules
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const Album = require("../models/album");

// Require DB connection
const db = require("../models");

const spotifyAPIBaseURL = "https://api.spotify.com/v1";
const token = "Your_Spotify_Access_Token";

// Function to fetch album data from Spotify API
async function fetchAlbumsFromSpotify() {
  // Define the endpoint URL
  const endpoint = `${spotifyAPIBaseURL}/search?q=album&type=album&limit=20`;
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
    // Return the albums array
    return data.albums.items;
  } catch (error) {
    // Log error and throw it up the chain
    console.error("Error fetching albums from Spotify:", error);
    throw error;
  }
}

// Index - GET - /albums
router.get("/albums", async (req, res) => {
  try {
    // Fetch albums from Spotify
    const albums = await fetchAlbumsFromSpotify();
    // Send the response
    res.json(albums);
  } catch (error) {
    // Handle error
    res.status(500).json({ error: "Failed to fetch albums from Spotify" });
  }
});

// Create - POST - /albums

// Show - GET - /albums/:id

// Update - PUT - /albums/:id

// Delete - DELETE - /albums/:id

module.exports = router;