require("dotenv").config();
const mongoose = require("mongoose");

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODBURI);
const db = mongoose.connection;

db.on("connected", function () {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});


db.on("error", (err) => {
  console.error("Connection error:", err);
  process.exit();
});


module.exports = {
  User: require("./user"),
  Review: require("./review"),
  Album: require("./album"),
  Artist: require("./artist"),
};
