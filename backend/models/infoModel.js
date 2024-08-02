const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const infoSchema = new Schema({
  clubName: String,
  associationName: String,
  description: String,
  tagline: String,
  email: String,
  contactNumber: String,
  teamImg: String,
  logo: String,
  instaUrl: String,
  socialLinks: {
    facebook: String,
    instagram: String,
    twitter: String,
    youtube: String,
  }
}, { timestamps: true });

module.exports = mongoose.model('Info', infoSchema);
