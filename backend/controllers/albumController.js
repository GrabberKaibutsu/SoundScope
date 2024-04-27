// Require modules
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const validateJWT = require("./validateJWT");
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
 
async function fetchAlbums(){

  const endpoint = "https://api.spotify.com/v1/browse/new-releases?limit=30"

  try {

    // Fetch data from Spotify API
    const albumsResponse = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // If the response is not OK, throw an error
    if (!albumsResponse.ok) {
      throw new Error(`Spotify API request failed: ${albumsResponse.statusText}`);
    }

    // Parse the response body as JSON
    const data = await albumsResponse.json();
    // Return the artists array
    return data.albums.items;

  } catch (error) {
    // Log error and throw it up the chain
    console.error("Error fetching albums from Spotify:", error);
    throw error;
  }
}

async function fetchAlbum(albumID){

  const endpoint = `https://api.spotify.com/v1/albums/${albumID}`

  try {

    // Fetch data from Spotify API
    const albumResponse = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // If the albumResponse is not OK, throw an error
    if (!albumResponse.ok) {
      throw new Error(`Spotify API request failed: ${albumResponse.statusText}`);
    }

    // Parse the albumResponse body as JSON
    const data = await albumResponse.json();
    // Return the album array
    return data;

  } catch (error) {
    // Log error and throw it up the chain
    console.error("Error fetching albums from Spotify:", error);
    throw error;
  }
}

// Index - GET - /albums
router.get("/", async (req, res) => {
  try {

    console.log(token)
    
    // Fetch albums from Spotify
    const albums = await fetchAlbums();
    // Send the response
    res.json(albums);

  } catch (error) {
    // Handle error
    res.status(500).json({ error: "Failed to fetch albums from Spotify" });
  }
});

// GET album is favorited for user
router.get("/favorited/:userId/:albumId", validateJWT, async (req, res) => {
  try {
    const userId = req.params.userId;
    const albumId = req.params.albumId;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isFavorited = user.favoriteAlbums.includes(albumId); // Check if albumId is in the user's favoriteAlbums array
    res.json({ isFavorited: isFavorited });

  } catch (error) {
    console.error("Error checking favorite status:", error);
    res.status(500).json({ message: error.message });
  }
});

// Show - GET - /albums/:id
router.get("/:id", async (req, res)=> {
  try{
    
    // Fetch albums from Spotify
    const album = await fetchAlbum(req.params.id);
    // Send the response
    res.json(album);

  }catch (error) {
    // Handle error
    res.status(500).json({ error: "Failed to fetch album from Spotify" });
  }
})

// Route to toggle favorite status
router.post('/favorited/:userId/:itemId', async (req, res)=> {
  try {
    const userId = req.params.userId;
    const itemId = req.params.itemId;

    console.log(userId)

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the item is already in favorites
    const index = user.favoriteAlbums.indexOf(itemId);
    if (index !== -1) {
      // Item is already favorited, so remove it
      user.favoriteAlbums.splice(index, 1);
    } else {
      // Item is not favorited, so add it
      user.favoriteAlbums.push(itemId);
    }

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: 'Favorite status toggled successfully' });
  } catch (error) {
    console.error('Error toggling favorite status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

module.exports = router;