const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.static('public')); // serves index.html

// Route: Root
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
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
  const dateParam = req.params.date;

  // Check if input is a UNIX timestamp (digits only)
  const parsedDate = /^\d+$/.test(dateParam)
    ? new Date(parseInt(dateParam))
    : new Date(dateParam);

  // Validate
  if (parsedDate.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
