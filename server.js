require('dotenv').config();

// Dependencies
const express = require('express');
const app = express();
const Pokemon = require('./models/pokemon')
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// Request Logger
const morgan = require('morgan');
const pokemon = require('./models/pokemon');
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
    res.render('new.ejs', { 
        totalNumber: Pokemon.length,
        weaknessList: Pokemon[0].damages
    })
});

// Delete Route
app.delete('/pokemon/:id', (req, res) => {
    pokemon.splice(req.params.id, 1);
    console.log(`Deteled Pokemon #${req.params.id}`)
    res.redirect('/pokemon')
});

// Update Route
app.put('/pokemon/:id', (req, res) => {
    res.send(`You sent an update request for Pokemon # ${req.params.id}`)
    console.log(`Update request for Pokemon # ${req.params.id} received!`)
});

// Create Route
app.post('/pokemon', (req, res) => {
    let pokemonType = [];
    Object.values(req.body.type).forEach(element => {
        let type = element.charAt(0).toUpperCase() + element.slice(1);
        return pokemonType.push(type)
    });

    let newPokemon = {
        id:req.body.id,
        name:req.body.name,
        img:req.body.img,
        type:pokemonType,
        stats:{
            hp:req.body.hp,
            attack:req.body.attack,
            defense:req.body.defense
        },
        damages:{
            normal: req.body.normal,
            fire: req.body.fire,
            water: req.body.water,
            electric: req.body.electric,
            grass: req.body.grass,
            ice: req.body.ice,
            fight: req.body.fight,
            poison: req.body.poison,
            ground: req.body.ground,
            flying: req.body.flying,
            psychic: req.body.psychic,
            bug: req.body.bug,
            rock: req.body.rock,
            ghost: req.body.ghost,
            dragon: req.body.dragon,
            dark: req.body.dark,
            steel: req.body.steel,
        },
        misc:{
            abilities: {
                normal:
                    req.body.abilities.split(/,| /),
            }
        }
    }
    Pokemon.push(newPokemon)
    res.redirect('/pokemon')
});

// Edit Route
app.get('/pokemon/:id/edit', (req, res) => {
    res.render('edit.ejs', {
        singlePokemon: Pokemon[req.params.id]
    })
});

// Show Route
app.get('/pokemon/:id', (req, res) => {
    res.render('show.ejs', { singlePokemon: Pokemon[req.params.id] })
});

// Listener
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`You're listening live on port ${PORT}`));