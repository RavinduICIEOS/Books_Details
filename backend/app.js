import bodyParser from 'body-parser';
import express from 'express';
import axios from 'axios';  // To make HTTP requests to Google Books API

dotenv.config(); // Load environment variables from .env

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

// Set CORS headers for all incoming requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

// Route to get books from Google Books API
app.get('/api/books', async (req, res) => {
  const query = req.query.q || 'react';  // Default to 'react' if no query is provided
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY; // Load the API key from the environment
  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`);
    res.json(response.data.items);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Failed to fetch books from Google Books API.' });
  }
});

// Handle OPTIONS requests for CORS
app.use((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  res.status(404).json({ message: 'Not found' });
});

app.listen(3002, () => {
  console.log('Backend server is running on port 3002');
});