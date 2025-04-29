const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Movie = require('./models/movie.model.js');
const env = require('dotenv').config();

const PORT = process.env.PORT || 5000;

//dont forget to add your own connection string and password. 
// Install dotenv package to use .env file
// and create a .env file in the root directory of your project with the following content:
// USER=your_username
// PASSWORD=your_password
// DB=your_database_name
// PORT=your_port_number

const MONGO_URI = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.c3iqqlh.mongodb.net/${process.env.DB}?retryWrites=true&w=majority&appName=Cluster0`;

(async function connectToDatabase() {
    try {
        await mongoose.connect(MONGO_URI, {});
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
})();

app.get('/', (req, res) => {
    res.send('Welcome to the Movie API! Use /api/movies to get a list of movies.');
});

app.use(express.json());

app.get('/api/movies', async (req, res) => {
    try {
        const db = mongoose.connection.db;
        const movies = await db.collection('movies').find().limit(10).toArray();
        res.json(movies);
    } catch (err) {
        console.error('Error fetching movies:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
);

app.get('/api/movies/:id', async (req, res) => {
    const movieId = req.params.id;
    try {
        const db = mongoose.connection.db;
        const movie = await db.collection('movies').findOne({ _id: new mongoose.Types.ObjectId(movieId) });
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.json(movie);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
        console.error('Error fetching movie:', err);
    }
})

app.post('/api/movies', async (req, res) => {

    try {
        const { title, year, plot } = req.body;
        const newMovie = await Movie.create({ title, year, plot });
        res.status(201).json(newMovie);
    } catch (err) {
        console.error('Error adding movie:', err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

