const express = require('express');
const { getPokemonDetails } = require('../controllers/pokemonController');

const router = express.Router();

router.get('/:name', getPokemonDetails);

module.exports = router;
