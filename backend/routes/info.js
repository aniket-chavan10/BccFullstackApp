const express = require('express');
const router = express.Router();
const Info = require('../models/cricketCubModel');
const multer = require('multer');
const path = require('path');

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Utility function to normalize paths
const normalizePath = (filePath) => {
  return filePath.replace(/\\/g, '/').replace(/^.*(uploads)/, '/$1');
};

// Route to get the latest cricket club entry
router.get('/', async (req, res) => {
  try {
    const latestClub = await Info.findOne().sort({ createdAt: -1 });
    if (!latestClub) {
      return res.status(404).json({ message: 'No cricket club found' });
    }
    if (latestClub.teamImg) latestClub.teamImg = normalizePath(latestClub.teamImg);
    if (latestClub.logo) latestClub.logo = normalizePath(latestClub.logo);
    res.json(latestClub);
  } catch (error) {
    console.error('Error fetching cricket club information:', error);
    res.status(500).json({ message: 'Error fetching cricket club information', error: error.message });
  }
});

// Route to update the single cricket club entry
router.put('/:id', upload.fields([
  { name: 'teamImg', maxCount: 1 },
  { name: 'logo', maxCount: 1 }
]), async (req, res) => {
  const { clubName, associationName, description, tagline, email, contactNumber, socialLinks } = req.body;
  const teamImg = req.files && req.files['teamImg'] ? normalizePath(req.files['teamImg'][0].path) : '';
  const logo = req.files && req.files['logo'] ? normalizePath(req.files['logo'][0].path) : '';

  try {
    const updatedClub = await Info.findByIdAndUpdate(
      req.params.id,
      { clubName, associationName, description, tagline, logo, teamImg, email, contactNumber, socialLinks: JSON.parse(socialLinks) },
      { new: true }
    );
    if (!updatedClub) {
      return res.status(404).json({ message: 'Cricket club not found' });
    }
    res.json({ message: 'Cricket club updated successfully', club: updatedClub });
  } catch (error) {
    console.error('Error updating cricket club information:', error);
    res.status(500).json({ message: 'Error updating cricket club information', error: error.message });
  }
});

// Route to create a new cricket club entry
router.post('/', upload.fields([
  { name: 'teamImg', maxCount: 1 },
  { name: 'logo', maxCount: 1 }
]), async (req, res) => {
  const { clubName, associationName, description, tagline, email, contactNumber, socialLinks } = req.body;
  const teamImg = req.files && req.files['teamImg'] ? normalizePath(req.files['teamImg'][0].path) : '';
  const logo = req.files && req.files['logo'] ? normalizePath(req.files['logo'][0].path) : '';

  try {
    const parsedSocialLinks = socialLinks ? JSON.parse(socialLinks) : {};

    const newClub = new Info({
      clubName,
      associationName,
      description,
      tagline,
      email,
      contactNumber,
      teamImg,
      logo,
      socialLinks: parsedSocialLinks
    });

    await newClub.save();
    res.json({ message: 'Cricket club created successfully', club: newClub });
  } catch (error) {
    console.error('Error creating cricket club:', error);
    res.status(400).json({ message: 'Error creating cricket club', error: error.message });
  }
});

module.exports = router;
