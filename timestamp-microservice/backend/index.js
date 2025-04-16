// index.js
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.static('public'));

// Root route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Route: No date provided
app.get('/api', (req, res) => {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString(),
  });
});

// Route: Date provided
app.get('/api/:date', (req, res) => {
  const { date } = req.params;

  // If date is a number (unix timestamp)
  let parsedDate = /^\d+$/.test(date) ? new Date(parseInt(date)) : new Date(date);

  // Validate
  if (parsedDate.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  });
});

// Listener
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Your app is running on http://localhost:${PORT}`);
});
