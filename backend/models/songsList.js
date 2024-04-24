const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
    title: { type: String, required: true },
    artist: { type: Schema.Types.ObjectId, ref: 'Artist', required: true },
    album: { type: Schema.Types.ObjectId, ref: 'Album' },
    genre: [{ type: Schema.Types.ObjectId, ref: 'Genre' }],
    releaseDate: Date,
    duration: Number, 
    lyrics: String,
    spotifyUrl: String, 
    trackNumber: Number,
    likes: { type: Number, default: 0 },
    comments: [{ 
        body: String, 
        date: Date,
        postedBy: { type: Schema.Types.ObjectId, ref: 'User' }
    }]
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
