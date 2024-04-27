const express = require("express");
const router = express.Router();

require('dotenv').config()

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET

let token = "Your_Spotify_Access_Token";

let authParameters = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
}

// - [ ] https://www.youtube.com/watch?v=1PWDxgqLmDA

fetch('https://accounts.spotify.com/api/token', authParameters)
.then(result => result.json())
.then(data=> 
  // console.log(data)
  token = data.access_token
)
// - [ ] https://www.youtube.com/watch?v=1PWDxgqLmDA

async function getList(){

    const artistsEndpoint = `https://api.spotify.com/v1/search?q=year%3A2024&type=artist&market=US&limit=5`
    const albumsEndpoint = "https://api.spotify.com/v1/browse/new-releases?limit=5"
    const tracksEndpoint = `https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF/tracks?market=US&limit=10`
  
    try {
  
      // Fetch data from Spotify API
      const artistsResponse = await fetch(artistsEndpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const albumsResponse = await fetch(albumsEndpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const tracksResponse = await fetch(tracksEndpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      // If the response is not OK, throw an error
      if (!artistsResponse.ok) {
        throw new Error(`Spotify API request failed: ${artistsResponse.statusText}`);
      }
      if (!albumsResponse.ok) {
        throw new Error(`Spotify API request failed: ${albumsResponse.statusText}`);
      }
      if (!tracksResponse.ok) {
        throw new Error(`Spotify API request failed: ${tracksResponse.statusText}`);
      }
  
      // Parse the response body as JSON
      const artistsData = await artistsResponse.json();
      const albumsData = await albumsResponse.json();
      const tracksData = await tracksResponse.json();

      let data = [artistsData.artists.items, albumsData.albums.items, tracksData.items]
      // Return the array
      return data
  
    } catch (error) {
      // Log error and throw it up the chain
      console.error("Error fetching home data from Spotify:", error);
      throw error;
    }
  }

  router.get("/", async (req, res)=> {
    try{
      
      // Fetch data from Spotify with term
      const homeData = await getList();
      // Send the response
      res.send(homeData);
  
    }catch (error) {
      // Handle error
      res.status(500).json({ error: "Failed to fetch data from Spotify" });
    }
  })

module.exports = router;