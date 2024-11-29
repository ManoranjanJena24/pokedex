const { fetchPokemonFromAPI } = require('../services/pokemonService');
const cache = require('../utils/cache');

const getPokemonDetails = async (req, res) => {
    const { name } = req.params;
    try {
        const cachedData = cache.get(name.toLowerCase());
        if (cachedData) {
            return res.json(cachedData);
        }

        const pokemonData = await fetchPokemonFromAPI(name);
        cache.set(name.toLowerCase(), pokemonData);
        res.json(pokemonData);
    } catch (error) {
        res.status(404).json({ message: 'Pokemon not found.' });
    }
};

module.exports = { getPokemonDetails };
