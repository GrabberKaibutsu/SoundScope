const express = require("express");
const router = express.Router();
const fetch = require("node-fetch"); // Make sure to use static import for fetch

const spotifyAPIBaseURL = "https://api.spotify.com/v1";

let globalToken = '';

// Function to get Spotify access token
async function getSpotifyAccessToken() {
  if (globalToken) return globalToken; // Use cached token if available

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

  globalToken = data.access_token;
  console.log("Access Token:", globalToken);
  return globalToken;
}

// Middleware to ensure access token for every request
router.use(async (req, res, next) => {
  try {
    await getSpotifyAccessToken();
    next();
  } catch (error) {
    console.error('Error fetching Spotify access token:', error.message);
    res.status(500).json({ error: 'Failed to authenticate with Spotify' });
  }
});

// Function to fetch featured playlists from Spotify API
async function fetchFeaturedPlaylists() {
  const token = await getSpotifyAccessToken();
  const url = `${spotifyAPIBaseURL}/browse/featured-playlists?market=US&limit=20`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Spotify API request failed: ${response.statusText} - ${errorData.error.message}`);
  }

  return await response.json();
}

// Route to get featured playlists


router.get('/featured-playlists', async (req, res) => {
  console.log('Route /featured-playlists accessed');
  try {
      const playlists = await fetchFeaturedPlaylists();
      console.log('Playlists fetched:', playlists);
      res.json(playlists.playlists.items);
  } catch (error) {
      console.error('Error fetching featured playlists:', error);
      res.status(500).json({ error: error.message });
  }
});

// Fetch details of a specific playlist
router.get('/playlists/:id/tracks', async (req, res) => {
  try {
      const playlistId = req.params.id;
      const token = await getSpotifyAccessToken();
      const tracksUrl = `${spotifyAPIBaseURL}/playlists/${playlistId}/tracks`;

      const response = await fetch(tracksUrl, {
          method: 'GET',
          headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
      });

      if (!response.ok) {
          throw new Error(`Failed to fetch playlist details. Status: ${response.status}`);
      }

      const data = await response.json();
      res.json(data.items);
  } catch (error) {
      console.error('Error fetching playlist details:', error);
      res.status(500).json({ error: error.message });
  }
});

module.exports = router;
