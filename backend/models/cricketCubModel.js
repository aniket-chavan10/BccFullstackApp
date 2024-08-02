const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CricketClubSchema = new Schema({
  clubName: {
    type: String,
    required: false,
  },
  teamImg: {
    type: String,
    required: false,
  },
  associationName: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  tagline: {
    type: String,
    required: false,
  },
  logo: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  contactNumber: {
    type: String,
    required: false,
  },
  socialLinks: {
    facebook: {
      type: String,
      required: false,
    },
    twitter: {
      type: String,
      required: false,
    },
    instagram: {
      type: String,
      required: false,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("CricketClub", CricketClubSchema);
