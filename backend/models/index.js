require("dotenv").config();
const mongoose = require("mongoose");

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODBURI);
const db = mongoose.connection;

db.on("connected", function () {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});

module.exports = {
  User: require("./models/user"),
  Review: require("./models/review"),
  Album: require("./models/album"),
  Artist: require("./models/artist"),
};