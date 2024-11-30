const express = require('express');
const { getPokemonDetails,searchPokemon } = require('../controllers/pokemonController');

const router = express.Router();

router.get('/:name', getPokemonDetails);
router.get('/', searchPokemon); 

module.exports = router;
