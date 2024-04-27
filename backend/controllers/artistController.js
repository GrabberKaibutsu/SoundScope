const express = require("express");
const router = express.Router();
const Artist = require("../models/artist");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const validateJWT = require("./validateJWT");

// Require DB connection
const db = require("../models");

const spotifyAPIBaseURL = "https://api.spotify.com/v1";

// Set up node fetch for making requests to Spotify API
async function fetch(url, options) {
  const { default: fetch } = await import("node-fetch");
  return fetch(url, options);
}

// Function to get Spotify access token
async function getSpotifyAccessToken() {
  // Get Spotify client ID
  const clientId = process.env.CLIENT_ID;
  // Get Spotify client secret from environment variables
  const clientSecret = process.env.CLIENT_SECRET;
  // Define the token URL
  const tokenUrl = "https://accounts.spotify.com/api/token";
  // Uses buffer to encode the client ID and client secret in base64
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );

  // Fetch the access token
  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  // Parse the response body as JSON
  const data = await response.json();
  // Log the access token
  console.log("Access Token:", data.access_token);
  // If the response is not OK, throw an error
  if (!response.ok) {
    // Log the error
    throw new Error(`Spotify token request failed: ${data.error_description}`);
  }
  // Return the access token
  return data.access_token;
}

// Function to fetch artist data from Spotify API
async function fetchArtistsFromSpotify(limit = 8) {
  // Get Spotify access token using the getSpotifyAccessToken function
  const token = await getSpotifyAccessToken();
  // Get Spotify API base URL and define the endpoint for the search query
  const endpoint = `${spotifyAPIBaseURL}/search?q=year%3A2024&type=artist&market=US&limit=${limit}`;

  try {
    // Fetch data from Spotify API
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // Log the error if the response is not OK and throw an error with the status text of the response object as the message
      throw new Error(`Spotify API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.artists.items;
  } catch (error) {
    console.error("Error fetching artists from Spotify:", error);
    throw error;
  }
}

// Function to fetch a single artist's data from Spotify API using the artist ID
async function fetchArtistFromSpotify(artistId) {
  // Get Spotify access token using the getSpotifyAccessToken function and store it in the token variable
  const token = await getSpotifyAccessToken();
  // Define the endpoint for the artist search query using the artist ID as the parameter
  const endpoint = `https://api.spotify.com/v1/artists/${artistId}`;

  try {
    // Fetch data from Spotify API using the artist ID and access token in the headers of the request object as the Authorization header with the value Bearer followed by the access token
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Spotify API request failed: ${response.statusText}`);
    }

    const artistData = await response.json();
    return artistData;
  } catch (error) {
    console.error("Error in fetchArtistFromSpotify:", error);
  }
}

// Index HOME PAGE - GET - /artists
router.get("/", async (req, res) => {
  try {
    // Fetch artists from Spotify using the fetchArtistsFromSpotify function
    const artists = await fetchArtistsFromSpotify();
    // Send the response as JSON with the fetched artists
    res.json(artists);
  } catch (error) {
    // Handle error
    res.status(500).json({ error: "Failed to fetch artists from Spotify" });
  }
});

// Index ARTISTS PAGE - GET - /artists
router.get("/home", async (req, res) => {
  try {
    // Fetch artists from Spotify using the fetchArtistsFromSpotify function
    const artists = await fetchArtistsFromSpotify(20);
    // Send the response as JSON with the fetched artists
    res.json(artists);
  } catch (error) {
    // Handle error
    res.status(500).json({ error: "Failed to fetch artists from Spotify" });
  }
});

// GET Check to see if an artist is favorited for a user
router.get("/:artistId/is-favorited", validateJWT, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { artistId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isFavorited = user.favoriteArtists.includes(artistId);
    res.json({ isFavorited: isFavorited });
  } catch (error) {
    console.error("Error checking favorite status:", error);
    res.status(500).json({ message: error.message });
  }
});

// Create - POST - /artists

// Show - GET - /artists/:id
router.get("/:id", async (req, res) => {
  try {
    // Get the artist ID from the request parameters using req.params.id
    const artistId = req.params.id;
    // Fetch the artist data from Spotify using the fetchArtistFromSpotify function with the artist ID as the argument
    const artist = await fetchArtistFromSpotify(artistId);
    res.json(artist);
  } catch (error) {
    console.error("Error fetching artist from Spotify:", error);
    res.status(500).json({ error: "Failed to fetch artist from Spotify" });
  }
});

// Update - PUT - /artists/:id

// Toggle favorite artist
router.post("/favorite", validateJWT, async (req, res) => {
  const { artistId } = req.body;
  const userId = req.user.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const index = user.favoriteArtists.indexOf(artistId);
    const isFavorited = index !== -1;
    if (isFavorited) {
      // If already favorited, remove it
      user.favoriteArtists.splice(index, 1);
    } else {
      // Otherwise, add to favorites
      user.favoriteArtists.push(artistId);
    }

    await user.save();
    res.status(200).json({
      message: "Favorite artists updated successfully",
      isFavorited: !isFavorited, // This should reflect the new state
    });
  } catch (error) {
    console.error("Error toggling favorite artist:", error);
    res.status(500).json({ message: error.message });
  }
});

// Delete - DELETE - /artists/:id
// Toggle Favorite Artist above deletes the favorited artist from the user's favoriteArtists array

module.exports = router;
