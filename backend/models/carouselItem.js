const mongoose = require("mongoose");

const carouselItemSchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    caption: { type: String, required: true },
  },
  { timestamps: true } // Ensure this option is included
);

module.exports = mongoose.model("CarouselItem", carouselItemSchema);
