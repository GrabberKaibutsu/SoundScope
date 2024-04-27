const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    songs: [{ type: Schema.Types.ObjectId, ref: 'Song' }], // Array of song references
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Users following the playlist
    likes: { type: Number, default: 0 },
    spotifyUrl: String, // Optional Spotify URL if integrated with Spotify
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
