const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const albumSchema = new Schema({
  totalTracks: { type: Number },
  name: { type: String },
  releaseDate: { type: Date },
  type: { type: String },
  artists: [{ type: Schema.Types.ObjectId, ref: "Artist" }],
});

module.exports = mongoose.model("Album", albumSchema);