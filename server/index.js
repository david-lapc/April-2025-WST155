const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model'); // Import the Product model

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/products', (req, res) => {
    try {

    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
}
);

mongoose.connect('mongodb+srv://davidlapc:mongobongo@cluster0.c3iqqlh.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});