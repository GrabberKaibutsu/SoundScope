const express = require("express");
const router = express.Router();
// const Songs = require("../models/songs");
// const User = require("../models/user");
// const jwt = require("jsonwebtoken");
// const validateJWT = require("./validateJWT");

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

// Function to fetch song data from Spotify API
async function fetchNewReleasesFromSpotify() {
    // Get Spotify access token using the getSpotifyAccessToken function
    const token = await getSpotifyAccessToken();
    // Get Spotify API base URL and define the endpoint for the search query
    const endpoint = `${spotifyAPIBaseURL}/search?q=year%3A2024&type=new-releases&market=US&limit=20`;
  
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
      console.error("Error fetching songs from Spotify:", error);
      throw error;
    }
  }
  
  // Function to fetch a single song data from Spotify API using the Song ID
  async function fetchSongFromSpotify(songId) {
    // Get Spotify access token using the getSpotifyAccessToken function and store it in the token variable
    const token = await getSpotifyAccessToken();
    // Define the endpoint for the artist search query using the artist ID as the parameter
    const endpoint = `https://api.spotify.com/v1/song/${songId}`;
  
    try {
      // Fetch data from Spotify API using the song ID and access token in the headers of the request object as the Authorization header with the value Bearer followed by the access token
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
  
      const SongData = await response.json();
      return SongData;
    } catch (error) {
      console.error("Error in fetchSongFromSpotify:", error);
    }
  }
  
//   router.get('/trending', async (req, res) => {
//     console.log("hey")
//     try {
//         const token = await getSpotifyAccessToken(); // Ensure you have a valid token
//         console.log(token);
//         const url = `${spotifyAPIBaseURL}/browse/new-releases?market=US&limit=20`;
//         const response = await fetch(url, {
//             method: 'GET',
//             headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
//         });

       
//         // Check if the response is not OK and attempt to log what was actually received
//         if (!response.ok) {
//             //console.log(`Received non-OK response: ${responseBody}`);
//             throw new Error(`Failed to fetch trending songs. Status: ${response.status}`);
//         }

//         const responseBody = await response.json(); // First get the response as text
// console.log(responseBody)
//         // const data = JSON.parse(responseBody); // Now safely parse the JSON
//         // console.log(data)
//         const tracks = responseBody.albums.items//.map(album => album.tracks.items).flat(); // Flatten the tracks arrays
//         res.json(tracks);
//     } catch (error) {
//         console.error('Error fetching trending songs:', error);
//         res.status(500).json({ error: error.toString() });
//     }
// });
router.get('/trending', async (req, res) => {
    try {
        const token = await getSpotifyAccessToken();
        const url = `${spotifyAPIBaseURL}/browse/new-releases?market=US&limit=20`;
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            const responseBody = await response.text();
            console.log(`Received non-OK response: ${responseBody}`);
            throw new Error(`Failed to fetch trending songs. Status: ${response.status}`);
        }

        const data = await response.json();
        // You may need to adjust this depending on actual data structure
        const albums = data.albums.items;
        let tracks = [];

        for (let album of albums) {
            const tracksResponse = await fetch(album.tracks.href, {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
            });
            if (tracksResponse.ok) {
                const tracksData = await tracksResponse.json();
                tracks.push(...tracksData.items); // Assuming tracksData.items contains an array of track details
            }
        }

        res.json(tracks);
    } catch (error) {
        console.error('Error fetching trending songs:', error);
        res.status(500).json({ error: error.toString() });
    }
});



  
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
      const errorData = await response.json(); // Decode JSON to get detailed error message
      throw new Error(`Spotify API request failed: ${response.statusText} - ${errorData.error.message}`);
    }
  
    return await response.json();
  }
  
  router.get("/songs/:id", async (req, res) => {
    try {
      const songDetails = await fetchSongDetails(req.params.id);
      res.json(songDetails);
    } catch (error) {
      console.error("Error fetching song details:", error);
      res.status(500).json({ error: error.message });
    }
  });
  
  module.exports = router;
  
