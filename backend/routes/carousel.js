const express = require('express');
const CarouselItem = require('../models/carouselItem'); // Import CarouselItem model
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Directory for carousel images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// POST endpoint for adding a new carousel item
router.post('/', upload.single('imageUrl'), async (req, res) => {
  try {
    const { caption } = req.body;
    const imageUrl = req.file ? req.file.path : '';

    if (!caption || !imageUrl) {
      return res.status(400).json({ message: 'Caption and image are required.' });
    }

    const newCarouselItem = new CarouselItem({
      imageUrl,
      caption,
    });

    const validationErrors = newCarouselItem.validateSync();
    if (validationErrors) {
      return res.status(400).json({ message: 'Validation error', errors: validationErrors });
    }

    await newCarouselItem.save();
    res.status(201).json({ message: 'Carousel item added successfully', item: newCarouselItem });
  } catch (error) {
    console.error('Error adding carousel item:', error);
    res.status(400).json({ message: 'Failed to add carousel item', error });
  }
});

// GET endpoint to fetch all carousel items
router.get('/', async (req, res) => {
  try {
    const carouselItems = await CarouselItem.find({})
      .sort({ createdAt: -1 }) // Sort by created date descending
      .limit(4); // Limit to the latest 4 items

    res.json(carouselItems);
  } catch (error) {
    console.error('Error retrieving carousel items:', error);
    res.status(500).json({ message: 'Error retrieving carousel items.' });
  }
});

// PUT endpoint to update a carousel item
router.put('/:id', upload.single('imageUrl'), async (req, res) => {
  try {
    const itemId = req.params.id;
    const { caption } = req.body;
    const imageUrl = req.file ? req.file.path : req.body.imageUrl; // Use existing image if not updated

    const updatedData = {
      caption,
      imageUrl,
    };

    const updatedCarouselItem = await CarouselItem.findByIdAndUpdate(itemId, updatedData, { new: true });

    if (!updatedCarouselItem) {
      return res.status(404).json({ message: 'Carousel item not found' });
    }

    res.json({ message: 'Carousel item updated successfully', item: updatedCarouselItem });
  } catch (error) {
    console.error('Error updating carousel item:', error);
    res.status(400).json({ message: 'Failed to update carousel item', error });
  }
});

module.exports = router;
