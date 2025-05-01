const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    year: { type: Number, required: true },
    plot: { type: String, required: true },
    imgUrl: { type: String, required: true },
}, { collection: 'movies' });

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;