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
      const genresResponse = await fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      // If the response is not OK, throw an error
      if (!genresResponse.ok) {
        throw new Error(`Spotify API request failed: ${genresResponse.statusText}`);
      }
  
      // Parse the response body as JSON
      const data = await genresResponse.json();
      // Return the artists array
      return data.genres
  
    } catch (error) {
      // Log error and throw it up the chain
      console.error("Error fetching genres from Spotify:", error);
      throw error;
    }
  }

async function getGenre(genreTerm){

    const endpoint = `https://api.spotify.com/v1/search?q=genre%${genreTerm}genreTerm&type=artist%2Ctrack&market=US&limit=5`
  
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
      return data
  
    } catch (error) {
      // Log error and throw it up the chain
      console.error("Error fetching genres from Spotify:", error);
      throw error;
    }
  }

  async function getGenreArtists(genreTerm){

    const endpoint = `https://api.spotify.com/v1/search?q=genre%${genreTerm}genreTerm&type=artist&market=US&limit=30`
  
    try {
  
      // Fetch data from Spotify API
      const artistGenreResponse = await fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      // If the response is not OK, throw an error
      if (!artistGenreResponse.ok) {
        throw new Error(`Spotify API request failed: ${artistGenreResponse.statusText}`);
      }
  
      // Parse the response body as JSON
      const data = await artistGenreResponse.json();
      // Return the artists array for genre
      return data
  
    } catch (error) {
      // Log error and throw it up the chain
      console.error("Error fetching genres from Spotify:", error);
      throw error;
    }
  }

  async function getGenreTracks(genreTerm){

    const endpoint = `https://api.spotify.com/v1/search?q=genre%${genreTerm}genreTerm&type=track&market=US&limit=30`
  
    try {
  
      // Fetch data from Spotify API
      const tracksGenreResponse = await fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      // If the response is not OK, throw an error
      if (!tracksGenreResponse.ok) {
        throw new Error(`Spotify API request failed: ${tracksGenreResponse.statusText}`);
      }
  
      // Parse the response body as JSON
      const data = await tracksGenreResponse.json();
      // Return the tracks array for genre
      return data
  
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

  router.get("/:genre", async (req, res)=> {
    try{

      // Fetch genres from Spotify with
      const genre = await getGenre(req.params.genre);
      // Send the response
      res.json(genre);

    }catch (error) {
      // Handle error
      res.status(500).json({ error: "Failed to fetch data from Spotify" });
    }
  })

  router.get("artists/:genre", async (req, res)=> {
    try{

      // Fetch genres from Spotify with
      const artistsGenre = await getGenreArtists(req.params.genre);
      // Send the response
      res.json(artistsGenre);

    }catch (error) {
      // Handle error
      res.status(500).json({ error: "Failed to fetch data from Spotify" });
    }
  })

  router.get("tracks/:genre", async (req, res)=> {
    try{

      // Fetch genres from Spotify with
      const tracksGenre = await getGenreTracks(req.params.genre);
      // Send the response
      res.json(tracksGenre);

    }catch (error) {
      // Handle error
      res.status(500).json({ error: "Failed to fetch data from Spotify" });
    }
  })

module.exports = router;