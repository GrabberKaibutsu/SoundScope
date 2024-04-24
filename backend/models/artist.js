const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artistSchema = new Schema({
  name: { type: String },
  genres: { type: String },
  followers: { type: Number },
  type: { type: String },
  albums: [{ type: Schema.Types.ObjectId, ref: "Album" }],
});

module.exports = mongoose.model("Artist", artistSchema);
