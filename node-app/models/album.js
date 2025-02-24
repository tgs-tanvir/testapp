const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    albumId: Number,
    id: { type: Number, unique: true }, // Ensure unique id
    title: String,
    url: String
});

module.exports = mongoose.model('Album', albumSchema);
