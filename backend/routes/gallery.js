const express = require('express');
const router = express.Router();
const Gallery = require('../models/galleryModel');
const multer = require('multer');
const path = require('path');

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Create the Multer instance
const upload = multer({ storage });

// Route to add new gallery data with file uploads
router.post('/add', upload.fields([
  { name: 'thumbnailImageUrl', maxCount: 1 },
  { name: 'imageUrls', maxCount: 10 }
]), async (req, res) => {
  try {
    const { caption } = req.body;

    // Construct image URLs from uploaded files
    const thumbnailImageUrl = req.files['thumbnailImageUrl'][0].path;
    const imageUrls = req.files['imageUrls'] ? req.files['imageUrls'].map(file => file.path) : [];

    const newGallery = new Gallery({
      thumbnailImageUrl,
      caption,
      additionalImageUrls: imageUrls, // Changed the field name for clarity
    });

    const savedGallery = await newGallery.save();
    res.status(201).json(savedGallery);
  } catch (error) {
    console.error('Error adding gallery data:', error);
    res.status(500).json({ error: 'Failed to add gallery data' });
  }
});

// GET route to fetch all gallery items
router.get('/', async (req, res) => {
  try {
    const galleryItems = await Gallery.find({})
      .sort({ createdAt: -1 }); // Sort by createdAt descending
    res.json(galleryItems);
  } catch (error) {
    console.error('Error retrieving gallery items:', error);
    res.status(500).json({ message: 'Error retrieving gallery items.' });
  }
});

// GET route to fetch a single gallery item by ID
router.get('/:id', async (req, res) => {
  try {
    const galleryItem = await Gallery.findById(req.params.id);
    if (!galleryItem) {
      return res.status(404).json({ message: 'Gallery item not found.' });
    }
    res.json(galleryItem);
  } catch (error) {
    console.error('Error retrieving gallery item:', error);
    res.status(500).json({ message: 'Error retrieving gallery item.' });
  }
});

module.exports = router;
