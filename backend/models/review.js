const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  reviewedBy: { type: String, required: true },
  itemId: { type: String, required: true }, // The ID of the item being reviewed
  comment: { type: String, required: true },
  reviewDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Review", reviewSchema);