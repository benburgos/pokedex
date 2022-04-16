require('dotenv').config();

// Dependencies
const express = require('express');
const app = express();
const Pokemon = require('./models/pokemon')

// Request Logger
const morgan = require('morgan')
app.use(morgan('tiny'));

// Middleware
app.use(express.urlencoded({ extended: false }));

//// INDUCES
// Index Route
app.get('/pokemon', (req, res) => {
    res.render('index.ejs', { allPokemon: Pokemon })
});

// New Route
app.get('/pokemon/new', (req, res) => {
    res.send('You are at the new pokemon page!')
    console.log('New Route Success')
});

// Delete Route
app.delete('/pokemon/:id', (req, res) => {
    res.send(`You deleted Pokemon # ${req.params.id}`)
    console.log(`Delete request for Pokemon # ${req.params.id} received!`)
})

// Update Route
app.put('/pokemon/:id', (req, res) => {
    res.send(`You sent an update request for Pokemon # ${req.params.id}`)
    console.log(`Update request for Pokemon # ${req.params.id} received!`)
})

// Create Route
app.post('/pokemon', (req, res) => {
    res.send(`You created a new pokemon!`)
    console.log('New pokemon request received')
})

// Edit Route
app.get('/pokemon/:id/edit', (req, res) => {
    res.send(`You've reached the page to edit Pokemon # ${req.params.id}`)
    console.log('Edit Route Success')
})

// Show Route
app.get('/pokemon/:id', (req, res) => {
    res.render('show.ejs', { singlePokemon: Pokemon[req.params.id] })
})

// Listener
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`You're listening live on port ${PORT}`))