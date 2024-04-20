// routes/playlists.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM playlists');
    res.json(rows);
  } catch (error) {
    console.error('Failed to retrieve playlists:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
