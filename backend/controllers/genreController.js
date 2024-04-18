const express = require("express");
const router = express.Router();

require('dotenv').config()

const CLIENT_ID = process.env.Client_ID
const CLIENT_SECRET = process.env.Client_Secret

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

async function getGenres(){

    const endpoint = `https://api.spotify.com/v1/recommendations/available-genre-seeds`
  
    try {
  
      // Fetch data from Spotify API
      const genreResponse = await fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      // If the response is not OK, throw an error
      if (!genreResponse.ok) {
        throw new Error(`Spotify API request failed: ${genreResponse.statusText}`);
      }
  
      // Parse the response body as JSON
      const data = await genreResponse.json();
      // Return the artists array
      return data.genres
  
    } catch (error) {
      // Log error and throw it up the chain
      console.error("Error fetching genres from Spotify:", error);
      throw error;
    }
  }

  router.get("/", async (req, res)=> {
    try{
      
      // Fetch genres from Spotify with
      const genres = await getGenres();
      // Send the response
      res.json(genres);
  
    }catch (error) {
      // Handle error
      res.status(500).json({ error: "Failed to fetch data from Spotify" });
    }
  })

module.exports = router;