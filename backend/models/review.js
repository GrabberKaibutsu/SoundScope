const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  reviewedBy: { type: Schema.Types.ObjectId, ref: "User" },
  itemId: { type: Schema.Types.ObjectId, required: true }, // The ID of the item being reviewed
  itemType: { type: String, required: true, enum: ['Artist', 'Song', 'Album'] }, // Type of the item
  title: { type: String, required: true },
  content: { type: String, required: true },
  reviewDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Review", reviewSchema);