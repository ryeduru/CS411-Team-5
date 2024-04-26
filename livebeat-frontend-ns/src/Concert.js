import React from 'react';

const Concerts = ({ concerts }) => (
  <section>
    <h2>Upcoming Concerts</h2>
    <ul>
      {concerts.map((concert) => (
        <li key={concert.id}>
          <strong>{concert.name}</strong>
          <p>{concert.type}</p>
        </li>
      ))}
    </ul>
  </section>
);

export default Concerts;
