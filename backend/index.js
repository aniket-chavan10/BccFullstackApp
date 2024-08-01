const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/BccDB";

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
  })
  .then((response) => {
    console.log("Database connection established");
  })
  .catch((error) => {
    console.log("Error connecting to Mongo", error);
  });

const infoRoutes = require("./routes/info");
app.use("/api/info", infoRoutes);

const carouselRoutes = require("./routes/carousel");
app.use("/api/carousel", carouselRoutes);

const playersRoutes = require("./routes/players");
app.use("/api/players", playersRoutes);

const newsRoutes = require("./routes/news");
app.use("/api/news", newsRoutes);

const galleryRoutes = require("./routes/gallery");
app.use("/api/gallery", galleryRoutes);

const fixtureRoutes = require("./routes/fixture");
app.use("/api/fixtures", fixtureRoutes);

const loginRoutes = require("./routes/login");
app.use("/api/login", loginRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
