require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 5000;
const db = require('./db'); // This imports the database configuration
const proute = require('./routes/playlists');
const croute = require('./routes/concerts');

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// Check if necessary environment variables are set
const requiredEnv = ['SPOTIFY_CLIENT_ID', 'SPOTIFY_CLIENT_SECRET', 'TICKETMASTER_API_KEY'];
const unsetEnv = requiredEnv.filter(envVar => !(typeof process.env[envVar] !== 'undefined'));

if (unsetEnv.length > 0) {
  console.error("Required ENV variables are not set: [" + unsetEnv.join(', ') + "]");
  process.exit(1);
}

// Endpoint to retrieve Spotify access token
app.get("/spotify_token", async (req, res) => {
  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      "grant_type=client_credentials",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + Buffer.from(
            process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET
          ).toString("base64"),
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error getting Spotify token:", error);
    res.status(500).json({ message: "Failed to retrieve Spotify token", error: error.message });
  }
});

// Endpoint to search Ticketmaster attractions
app.get("/ticketmaster_attractions", async (req, res) => {
  try {
    const response = await axios.get(
      "https://app.ticketmaster.com/discovery/v2/attractions.json",
      {
        params: {
          apikey: process.env.TICKETMASTER_API_KEY,
          // Include other parameters as needed
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching from Ticketmaster:", error);
    res.status(500).json({ message: "Failed to fetch from Ticketmaster", error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
