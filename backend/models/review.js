const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  reviewedBy: { type: Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  content: { type: String, required: true },
  reviewDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Review", reviewSchema);