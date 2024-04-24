const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
require('dotenv').config();

const CLIENT_ID = process.env.Client_ID;
const CLIENT_SECRET = process.env.Client_Secret;

let globalToken = ''; // Initialize a variable to store the access token globally

// Function to fetch a new access token
async function fetchAccessToken() {
    const authParameters = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
    };

    const response = await fetch('https://accounts.spotify.com/api/token', authParameters);
    const data = await response.json();
    globalToken = data.access_token; // Store the access token globally
}

// Middleware to ensure token is available on every request
router.use(async (req, res, next) => {
    if (!globalToken) {
        await fetchAccessToken();
    }
    next();
});

// Get trending songs
router.get('/trending', async (req, res) => {
    const url = 'https://api.spotify.com/v1/browse/new-releases';
    try {
        const response = await fetch(url, {
            headers: { 'Authorization': `Bearer ${globalToken}` }
        });
        if (!response.ok) throw new Error('Failed to fetch trending songs.');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching trending songs:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get single song details
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const url = `https://api.spotify.com/v1/tracks/${id}`;
    try {
        const response = await fetch(url, {
            headers: { 'Authorization': `Bearer ${globalToken}` }
        });
        if (!response.ok) throw new Error('Failed to fetch song details.');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching song details:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

