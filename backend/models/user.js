const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  favoriteArtists: [{ type: Schema.Types.ObjectId, ref: "Artist" }],
  favoriteAlbums: [{ type: Schema.Types.ObjectId, ref: "Album" }],
});

module.exports = mongoose.model("User", userSchema);