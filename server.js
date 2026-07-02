const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
// backend/server.js
app.use(cors({
  origin: 'https://frondend-omega.vercel.app' // Paste your actual Vercel URL here
}));

app.use(express.json());

// Establish connection pool to MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Convert pool to support async/await promises
const db = pool.promise();

// API Route: Get all items from a table
app.get('/api/items', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM student');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start backend server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server successfully running on port ${PORT}`);
});
