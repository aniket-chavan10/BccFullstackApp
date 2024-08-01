const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// Define the schema
const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  dob: { type: Date, required: true },
  pin: { type: String, required: true }
});

// Hash PIN before saving
userSchema.pre('save', async function(next) {
  const user = this;
  if (!user.isModified('pin')) return next();

  try {
    const hashedPin = await bcrypt.hash(user.pin, 10);
    user.pin = hashedPin;
    next();
  } catch (error) {
    return next(error);
  }
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
