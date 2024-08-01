const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Fixture = require('../models/fixtureModel'); // Assuming you have a Fixture model

// Multer configuration for handling multiple file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Destination directory for storing uploaded files
  },
  filename: (req, file, cb) => {
    // Generate a unique filename using the current timestamp + original extension
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post('/', upload.fields([{ name: 'team1Logo', maxCount: 1 }, { name: 'team2Logo', maxCount: 1 }]), async (req, res) => {
  try {
    const newFixture = new Fixture({
      date: req.body.date,
      matchNumber: req.body.matchNumber,
      matchStatus: req.body.matchStatus,
      team1: {
        name: req.body.team1Name,
        score: req.body.team1Score,
        logo: req.files['team1Logo'] ? req.files['team1Logo'][0].path : '',
      },
      team2: {
        name: req.body.team2Name,
        score: req.body.team2Score,
        logo: req.files['team2Logo'] ? req.files['team2Logo'][0].path : '',
      },
      matchResult: req.body.matchResult,
      venue: req.body.venue,
      matchTime: req.body.matchTime,
    });

    await newFixture.save();
    res.status(201).json({ message: 'Fixture added successfully', fixture: newFixture });
  } catch (error) {
    console.error('Error adding fixture:', error);
    res.status(400).json({ message: 'Failed to add fixture', error });
  }
});

// GET endpoint to fetch all fixtures
router.get('/', async (req, res) => {
  try {
    const fixtures = await Fixture.find({}); // Use Fixture instead of fixturesModel
    res.json({ fixtures });
  } catch (error) {
    console.error('Error fetching fixtures:', error);
    res.status(500).json({ message: 'Failed to fetch fixtures', error });
  }
});

// GET endpoint to fetch a fixture by ID
router.get('/:id', async (req, res) => {
  try {
    const fixture = await Fixture.findById(req.params.id);
    if (!fixture) {
      return res.status(404).json({ message: 'Fixture not found' });
    }
    res.json(fixture);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch fixture', error });
  }
});

// PUT endpoint to update a fixture by ID
router.put('/:id', upload.none(), async (req, res) => { // Use upload.none() if no file uploads are needed
  try {
    const { matchStatus, matchResult, team1, team2 } = req.body;

    // Find the fixture by ID and update only the specified fields
    const updatedFixture = await Fixture.findByIdAndUpdate(
      req.params.id,
      { $set: { matchStatus, matchResult, 'team1.score': team1?.score, 'team2.score': team2?.score } },
      { new: true } // Return the updated document
    );

    if (!updatedFixture) {
      return res.status(404).json({ message: 'Fixture not found' });
    }

    res.json({ message: 'Fixture updated successfully', fixture: updatedFixture });
  } catch (error) {
    console.error('Error updating fixture:', error);
    res.status(500).json({ message: 'Failed to update fixture', error });
  }
});

module.exports = router;
