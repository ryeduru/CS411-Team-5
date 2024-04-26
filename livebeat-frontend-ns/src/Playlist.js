import React from 'react';

const Playlists = ({ playlists }) => (
  <section>
    <h2>My Spotify Playlists</h2>
    <ul>
      {playlists.map((playlist) => (
        <li key={playlist.id}>
          <strong>{playlist.name}</strong>
          <p>{playlist.description}</p>
        </li>
      ))}
    </ul>
  </section>
);

export default Playlists;
