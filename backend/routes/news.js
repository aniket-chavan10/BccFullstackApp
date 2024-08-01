const express = require('express');
const multer = require('multer');
const path = require('path');
const NewsItem = require('../models/newsModel');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Add file extension
  }
});

const upload = multer({ storage });

// POST route to add a new news item
router.post('/', upload.single('image'), async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);

    const { title, description } = req.body;
    const imageUrl = req.file ? req.file.path : '';

    // Validate inputs
    if (!title || !description || !imageUrl) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newsItem = new NewsItem({ title, description, imageUrl });
    await newsItem.save();

    res.status(201).json(newsItem);
  } catch (error) {
    console.error('Error adding news data:', error.message);
    res.status(500).json({ message: 'Failed to add news data', error: error.message });
  }
});

// GET route to fetch all news items sorted by createdAt descending
router.get('/', async (req, res) => {
  try {
    const newsItems = await NewsItem.find({}).sort({ createdAt: -1 }); // Sort by createdAt descending
    res.json(newsItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving news items.' });
  }
});

// GET route to fetch a single news item by ID
router.get('/:id', async (req, res) => {
  try {
    const newsItem = await NewsItem.findById(req.params.id);
    
    if (!newsItem) {
      return res.status(404).json({ message: 'News item not found' });
    }

    res.json(newsItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving news item.' });
  }
});

module.exports = router;
