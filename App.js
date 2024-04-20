import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Playlists from "./components/Playlists";
import Concerts from "./components/Concerts";

// import .env and then process.env.SPOTIFY_AUTH_TOKEN

const App = () => {
  const [playlists, setPlaylists] = useState([]);
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const spotifyAuthToken = process.env.REACT_APP_SPOTIFY_AUTH_TOKEN;
  const ticketmasterApiKey = process.env.REACT_APP_TICKETMASTER_API_KEY;

  const fetchSpotifyData = async () => {
    try {
      const response = await axios.get(
        "https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n",
        {
          headers: { Authorization: `Bearer ${spotifyAuthToken}` },
        }
      );
      setPlaylists(response.data.items);
      console.log("HERE");
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching from Spotify:", error);
      setError("Failed to load playlists from Spotify."); // Set an error message
      setLoading(false);
    }
  };

  const fetchTicketmasterData = async () => {
    try {
      const response = await axios.get(
        "https://app.ticketmaster.com/discovery/v2/attractions.json",
        {
          params: {
            apikey: ticketmasterApiKey,
          },
        }
      );
      setConcerts(response.data._embedded.attractions);
    } catch (error) {
      console.error("Error fetching from Ticketmaster:", error);
      setError("Failed to load attractions from Ticketmaster.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpotifyData();
    fetchTicketmasterData();
  }, []);

  useEffect(() => {
    if (playlists.length > 0 && concerts.length > 0) {
      setLoading(false);
    }
  }, [playlists, concerts]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    // Render the error message if an error has occurred
    return <div>Error: {error}</div>;
  }

  return (
    <div className="App">
      <h1>LiveBeat</h1>
      <Playlists playlists={playlists} />
      <Concerts concerts={concerts} />
    </div>
  );
};

export default App;
