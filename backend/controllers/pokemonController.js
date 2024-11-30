const { fetchPokemonListFromAPI,fetchPokemonFromAPI } = require('../services/pokemonService');
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


const searchPokemon = async (req, res) => {
    const { search } = req.query;

    if (!search) {
        return res.status(400).json({ message: 'Search query is required.' });
    }

    try {
        const cachedList = cache.get('pokemonList');
        const pokemonList = cachedList || (await fetchPokemonListFromAPI());

        if (!cachedList) {
            cache.set('pokemonList', pokemonList);
        }

        // Filter Pokémon names based on the substring
        const filteredNames = pokemonList.filter((name) =>
            name.toLowerCase().includes(search.toLowerCase())
        );

        // Fetch details for each filtered Pokémon
        const promises = filteredNames.map((name) => fetchPokemonFromAPI(name));
        const filteredResults = await Promise.all(promises);

        res.json(filteredResults); // Return detailed Pokémon data
    } catch (error) {
        console.error('Error fetching Pokémon:', error.message);
        res.status(500).json({ message: 'Failed to fetch Pokémon.' });
    }
};


module.exports = { getPokemonDetails,searchPokemon };
