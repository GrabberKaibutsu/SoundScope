// const express = require("express");
// const router = express.Router();

// // Require DB connection
// const db = require("../models");

// const spotifyAPIBaseURL = "https://api.spotify.com/v1";

// // Set up node fetch for making requests to Spotify API
// async function fetch(url, options) {
//   const { default: fetch } = await import("node-fetch");
//   return fetch(url, options);
// }

// // Function to get Spotify access token
// let globalToken = '';
// async function getSpotifyAccessToken() {
//   if (globalToken) return globalToken; // Return cached token if available

//   const clientId = process.env.CLIENT_ID;
//   const clientSecret = process.env.CLIENT_SECRET;
//   const tokenUrl = "https://accounts.spotify.com/api/token";
//   const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

//   const response = await fetch(tokenUrl, {
//     method: "POST",
//     headers: {
//       Authorization: `Basic ${credentials}`,
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: "grant_type=client_credentials",
//   });
//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(`Spotify token request failed: ${data.error_description}`);
//   }

//   globalToken = data.access_token;
//   console.log("Fetched Spotify Access Token:", globalToken);
//   return globalToken;
// }

// // Middleware to ensure access token for every request
// router.use(async (req, res, next) => {
//   try {
//     await getSpotifyAccessToken();
//     next();
//   } catch (error) {
//     console.error('Error fetching Spotify access token:', error.message);
//     res.status(500).json({ error: 'Failed to authenticate with Spotify' });
//   }
// });

// // Fetch playlists
// async function fetchPlaylists() {
//   const url = `${spotifyAPIBaseURL}/browse/featured-playlists?market=US&limit=20`;
//   const response = await fetch(url, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${globalToken}`,
//       "Content-Type": "application/json",
//     },
//   });

//   if (!response.ok) {
//     const errorData = await response.json(); // Get detailed error message
//     throw new Error(`Spotify API request failed: ${response.statusText} - ${errorData.error.message}`);
//   }

//   return await response.json();
// }

// router.get('/featured-playlists', async (req, res) => {
//   try {
//     const playlists = await fetchPlaylists();
//     res.json(playlists.playlists.items);
//   } catch (error) {
//     console.error('Error fetching featured playlists:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;

  
// const express = require("express");
// const router = express.Router();
// const Songs =require("../models/songslist");
// const fetch = require("node-fetch");  // Recommended to use static import for node-fetch at the top


// // Require DB connection
// const db = require("../models");

// const spotifyAPIBaseURL = "https://api.spotify.com/v1";


// // Set up node fetch for making requests to Spotify API
// async function fetch(url, options) {
//   const { default: fetch } = await import("node-fetch");
//   return fetch(url, options);
// }

// // Function to get Spotify access token
// async function getSpotifyAccessToken() {

//   const clientId = process.env.CLIENT_ID;
//   const clientSecret = process.env.CLIENT_SECRET;
//   const tokenUrl = "https://accounts.spotify.com/api/token";
//   const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

//   const response = await fetch(tokenUrl, {
//     method: "POST",
//     headers: {
//       Authorization: `Basic ${credentials}`,
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: "grant_type=client_credentials",
//   });
//   const data = await response.json();
//   console.log("Access Token:", data.access_token);
//   if (!response.ok) {
//     throw new Error(`Spotify token request failed: ${data.error_description}`);
//   }
//   return data.access_token;
// }

// // Middleware to ensure access token for every request
// // router.use(async (req, res, next) => {
// //   try {
// //     await getSpotifyAccessToken();
// //     next();
// //   } catch (error) {
// //     console.error('Error fetching Spotify access token:', error.message);
// //     res.status(500).json({ error: 'Failed to authenticate with Spotify' });
// //   }
// // });

// // Fetch playlists
// async function fetchPlaylists() {
//   const token = await getSpotifyAccessToken();
//  const endpoint = `${spotifyAPIBaseURL}/browse/featured-playlists?market=US&limit=20`;
//   try {
//  const response = await fetch(url, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   });

//   if (!response.ok) {
//     const errorData = await response.json(); // Get detailed error message
//     throw new Error(`Spotify API request failed: ${response.statusText} - ${errorData.error.message}`);
//   }
//   const data = await response.json();
//   return data.artists.items;
// } catch (error) {
//   console.error("Error fetching artists from Spotify:", error);
//   throw error;
// }
// }

// // Route to get featured playlists
// console.log('Setting up /featured-playlists route');
// router.get('/featured-playlists', async (req, res) => {
//   console.log('Accessed /featured-playlists');
//   try {
//     const playlists = await fetchPlaylists();
//     console.log(playlists); 
//     res.json(playlists.playlists.items);
//   } catch (error) {
//     console.error('Error fetching featured playlists:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;



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


router.get('/', async (req, res) => {
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
router.get('/playlists/:id', async (req, res) => {
  try {
      const playlistId = req.params.id;
      const token = await getSpotifyAccessToken();
      const url = `${spotifyAPIBaseURL}/playlists/${playlistId}`;

      const response = await fetch(url, {
          method: 'GET',
          headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
      });

      if (!response.ok) {
          throw new Error(`Failed to fetch playlist details. Status: ${response.status}`);
      }

      const playlistDetails = await response.json();
      res.json(playlistDetails);
  } catch (error) {
      console.error('Error fetching playlist details:', error);
      res.status(500).json({ error: error.message });
  }
});

module.exports = router;
