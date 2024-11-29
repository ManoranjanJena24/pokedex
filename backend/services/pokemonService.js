const axios = require('axios');

const fetchPokemonFromAPI = async (name) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    return {
        name: response.data.name,
        types: response.data.types.map((t) => t.type.name),
        abilities: response.data.abilities.map((a) => a.ability.name),
        stats: response.data.stats.map((s) => ({ name: s.stat.name, value: s.base_stat })),
        sprite: response.data.sprites.front_default,
    };
};

module.exports = { fetchPokemonFromAPI };
