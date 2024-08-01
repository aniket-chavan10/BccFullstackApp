const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  score: {
    type: String,
    required: true,
  }
});

const fixtureSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  matchNumber: {
    type: Number,
    required: true,
  },
  matchStatus: {
    type: String,
    enum: ['completed', 'upcoming'],
    required: true,
  },
  team1: {
    type: teamSchema,
    required: true,
  },
  team2: {
    type: teamSchema,
    required: true,
  },
  matchResult: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  matchTime: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Fixture", fixtureSchema);
