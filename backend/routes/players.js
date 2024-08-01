const express = require('express');
const playersModel = require('../models/players');
const router = express.Router();
const multer = require("multer");
const path = require('path');

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Destination directory for storing uploaded files
  },
  filename: (req, file, cb) => {
    // Generate unique filename using current timestamp + original extension
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// POST endpoint for adding a new player
router.post("/", upload.single("image"), async (req, res) => {
  try {
    // Create a new instance of playersModel with data from request
    const newPlayer = new playersModel({
      name: req.body.name,
      jerseyNo: req.body.jerseyNo,
      matches: req.body.matches,
      runs: req.body.runs,
      wickets: req.body.wickets,
      age: req.body.age,
      image: req.file ? req.file.path : "", // Store the file path if uploaded
      role: req.body.role,
      subrole: req.body.subrole,
      bestScore: req.body.bestScore,
      instaUrl: req.body.instaUrl,
    });

    // Perform validation using Mongoose schema validation
    const validationErrors = newPlayer.validateSync();
    if (validationErrors) {
      return res.status(400).json({ message: "Validation error", errors: validationErrors });
    }

    // Save the new player data to the database
    await newPlayer.save();
    res.status(201).json({ message: "Player added successfully" });
  } catch (error) {
    console.error("Error adding player:", error);
    res.status(400).json({ message: "Failed to add player", error });
  }
});

// GET endpoint to fetch all players
router.get('/', async (req, res) => {
  try {
    const players = await playersModel.find({});
    res.json(players);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const playerId = req.params.id;
    const updatedData = {
      name: req.body.name,
      jerseyNo: req.body.jerseyNo,
      matches: req.body.matches,
      runs: req.body.runs,
      wickets: req.body.wickets,
      age: req.body.age,
      image: req.file ? req.file.path : req.body.image, // Handle file upload
      role: req.body.role,
      subrole: req.body.subrole,
      bestScore: req.body.bestScore,
      instaUrl: req.body.instaUrl,
    };

    // Update player data in the database
    const updatedPlayer = await playersModel.findByIdAndUpdate(playerId, updatedData, { new: true });

    if (!updatedPlayer) {
      return res.status(404).json({ message: "Player not found" });
    }

    res.json({ message: "Player updated successfully", player: updatedPlayer });
  } catch (error) {
    console.error("Error updating player:", error);
    res.status(400).json({ message: "Failed to update player", error });
  }
});



module.exports = router;