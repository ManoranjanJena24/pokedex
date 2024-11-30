import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [allPokemon, setAllPokemon] = useState([]);

    // Fetch initial Pokémon data when the component mounts
    useEffect(() => {
        const fetchInitialPokemon = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
                const pokemonData = response.data.results;

                // Fetch details for each Pokémon
                const pokemonDetails = await Promise.all(
                    pokemonData.map(async (pokemon) => {
                        const detailsResponse = await axios.get(pokemon.url);
                        const details = detailsResponse.data;
                        return {
                            name: details.name,
                            sprite: details.sprites.front_default,
                            types: details.types.map(type => type.type.name),
                        };
                    })
                );

                setAllPokemon(pokemonDetails);
                setResults(pokemonDetails); // Display initial data on page load
            } catch (error) {
                console.error('Error fetching initial Pokémon data:', error.message);
            }
        };

        fetchInitialPokemon();
    }, []);

    // Handle the search input and fetch search results
    const handleSearch = async () => {
        if (!search.trim()) {
            setResults(allPokemon);
            return;
        }

        try {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1302');
            const allPokemonData = response.data.results;

            const filteredResults = allPokemonData
                .filter(pokemon => pokemon.name.toLowerCase().includes(search.toLowerCase()))
                .map(async (pokemon) => {
                    const detailsResponse = await axios.get(pokemon.url);
                    const details = detailsResponse.data;
                    return {
                        name: details.name,
                        sprite: details.sprites.front_default,
                        types: details.types.map(type => type.type.name),
                    };
                });

            // Wait for all filtered results to be resolved
            const resultsData = await Promise.all(filteredResults);
            setResults(resultsData);
        } catch (error) {
            console.error('Error fetching search results:', error.message);
        }
    };

    const handleCardClick = (pokemon) => {
        setSelectedPokemon(pokemon);
    };

    const handleBackClick = () => {
        setSelectedPokemon(null);
    };

    return (
        <div className="app">
            {selectedPokemon === null ? (
                <>
                    <h1>Pokedex</h1>
                    <div className="search">
                        <input
                            type="text"
                            placeholder="Enter Pokémon name"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button onClick={handleSearch}>Search</button>
                    </div>

                    <div className="results">
                        <div className="card-grid">
                            {results.map((pokemon, index) => (
                                <div
                                    key={index}
                                    className="pokemon-card"
                                    onClick={() => handleCardClick(pokemon)}
                                >
                                    <h2>{pokemon.name}</h2>
                                    <img src={pokemon.sprite} alt={pokemon.name} />
                                    <p>Types: {pokemon.types.join(', ')}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <div className="pokemon-card-details">
                    <button onClick={handleBackClick}>Back to Pokedex</button>
                    <h2>{selectedPokemon.name}</h2>
                    <img src={selectedPokemon.sprite} alt={selectedPokemon.name} />
                    <p>Types: {selectedPokemon.types.join(', ')}</p>
                    {/* Add additional details here if needed */}
                </div>
            )}
        </div>
    );
};

export default App;
